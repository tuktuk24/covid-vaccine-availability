const fetch = require('isomorphic-unfetch')
// const axios = require('axios')
const STATE_DATA = '/v2/admin/location/states'
const BASE_URL = 'https://cdn-api.co-vin.in/api'
const SEARCH_BY_PINCODE = '/v2/appointment/sessions/public/findByPin'





const getStateData = async () => {
    let data = undefined
    try {
        const response = await fetch(BASE_URL + STATE_DATA,
            {
                method: 'GET',
                headers: {
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36",
                    'Accept': '*/*'
                }
            }
        )
        const data = await response.json()
    } catch (error) {
        data = error
    }
    return data
}

const callApi = async (pincode, date) => {
    let data = undefined
    try {
        const response = await fetch(`${BASE_URL}${SEARCH_BY_PINCODE}?Accept-Language=en_US&pincode=${pincode}&date=${date}`,
            {
                method: 'GET',
                headers: {
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36",
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            }
        )
        data = await response.json()
    } catch (error) {
        data = error
    }
    return data
}

module.exports.callApi = callApi