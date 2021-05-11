const nodemailer = require('nodemailer')
require('dotenv').config()
const { districts } = require('./districts')
// If you are viewing the git repository, you will not find subscribers file, because it contains personal info
const { subscribers } = require('./subscribers')
const { getDistrictData, getPincodeData } = require('./gateway')
const user = process.env.EMAIL
const pass = process.env.PASS

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    name: 'tuktuk24.com',
    host: "mail.tuktuk24.com",
    port: 587,
    secure: false,
    auth: {
        user,
        pass,
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendNotification = (to, data) => {
    let sendMail = false
    let html = '<div> Vaccine in limited amount available in the following:<br/>'
    data.forEach(sessions => {
        html += `<b>Date:${sessions[0].date}</b> <br/><ol>` //
        sessions.forEach(item => {
            if (item.min_age_limit !== 18) return
            html += `<li>
                        <b>Address:${item.address}, PINCODE:${item.pincode}</b>
                        <p>Minimum Age:${item.min_age_limit}<p>
                        <p>Available Amount:${item.available_capacity}<p>
                        <p>Vaccine Type:${item.vaccine}<p>
                        <p>Fee:${item.fee}<p>
                    </li>`
            sendMail = true
        })
        html += '</ol>'
    })

    html += '</div><br/><br/><p>Book the vaccine by clicking here: <a href="https://selfregistration.cowin.gov.in/">https://selfregistration.cowin.gov.in/</a>'
    if (!sendMail) return
    const mailData = {
        from: '"Covid Vaccine Alerts" <info@tuktuk24.com>',  // sender address
        to,
        subject: 'Covid Vaccines Available for limited time!!!',
        text: 'Book Immediately!',
        html
    }

    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            console.log({ "message": "Email error" })
        }
        else {
            console.log({ message: `Mail Sent to ${to}`, message_id: info.messageId })
        }
    })
}



const fetchAgain = () => {
    const nowDate = new Date()
    const dates = []
    for (let i = 0; i < 7; i++) {
        const date = `${nowDate.getDate() + i}-${(nowDate.getMonth() + 1)}-${nowDate.getFullYear()}`
        dates.push(date)
    }
    subscribers.forEach(person => {
        districts.forEach(d => {
            if (person.districts.includes(d.district_name)) {
                callApi(d.district_id, dates, person.email)
            }
        })
    })
}

const callApi = async (district, dates, email) => {

    const notificationData = []
    for (let i = 0; i < dates.length; i++) {
        const data = await getDistrictData(district, dates[i])
        if (data?.sessions?.length > 0) {
            notificationData.push(data.sessions)
        }
    }
    if (notificationData.length > 0)
        sendNotification(email, notificationData)
}


module.exports.fetchAgain = fetchAgain