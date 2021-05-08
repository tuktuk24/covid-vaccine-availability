const express = require("express")
require('dotenv').config()
const {callApi} =  require('./functions')



const app = express()
const port = process.env.PORT || 5002
app.get('/',async (req, res) => {
    const data = await callApi('784001', '08-05-2021')
    // console.log(await data.json())
    res.send(data)
})

app.listen(process.env.PORT, () => {
    console.log("App running successfully")
})