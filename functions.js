const fetch = require('isomorphic-unfetch')
// const axios = require('axios')
const BASE_URL_DEMO = 'https://api.demo.co-vin.in/api'
const BASE_URL = 'https://cdn-api.co-vin.in/api'
const SEARCH_BY_PINCODE = '/v2/appointment/sessions/public/findByPin'


const callApi = async (pincode, date) => {
    const response = await fetch(`${BASE_URL_DEMO}${SEARCH_BY_PINCODE}?Accept-Language=en_US&pincode=${pincode}&date=${date}`,{
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials:'include',
        headers:{
            'Accept': 'application/json',
        }
    })
    
    const data = await response.json()
    return data
}

module.exports.callApi = callApi