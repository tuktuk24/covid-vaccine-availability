const fetch = require('isomorphic-unfetch')
const BASE_URL = 'https://cdn-api.co-vin.in/api'
const SEARCH_BY_PINCODE = '/v2/appointment/sessions/public/findByPin'
const SEARCH_BY_DISTRICT = '/v2/appointment/sessions/public/findByDistrict'

const getDistrictData = async (id, date) => {
    let data = undefined
    try {
        const response = await fetch(`${BASE_URL}${SEARCH_BY_DISTRICT}?district_id=${id}&date=${date}`,
            {
                method: 'GET',
                headers: {
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36",
                    'Accept': '*/*'
                }
            }
        )
        data = await response.json()
    } catch (error) {
        data = error
    }
    return data
}

const getPincodeData = async (pincode, date) => {
    let data = undefined
    try {
        const response = await fetch(`${BASE_URL}${SEARCH_BY_PINCODE}?pincode=${pincode}&date=${date}`,
            {
                method: "GET",
                headers: {
                    "Accept-Language": "hi_IN",
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        )
        data = await response.json()
    } catch (error) {
        data = error
    }
    return data
}

module.exports.getDistrictData = getDistrictData
module.exports.getPincodeData = getPincodeData