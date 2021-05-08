// const fetch = require('isomorphic-unfetch')
const axios = require('axios')
const BASE_URL = 'https://cdn-api.co-vin.in/api'
const SEARCH_BY_PINCODE = '/v2/appointment/sessions/public/findByPin'


const callApi = async (pincode, date) => {
    // const response = await fetch(`${BASE_URL}${SEARCH_BY_PINCODE}?Accept-Language=en_US&pincode=${pincode}&date=${date}`,{
    //     method: 'GET',
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     credentials:'include',
    //     headers:{
    //         'X-Requested-With': 'XMLHttpRequest',
    //         'Content-Type': 'application/json',
    //     }
    // })
    // const data = await response.json()
    const response = await axios.get(`${BASE_URL}${SEARCH_BY_PINCODE}?Accept-Language=en_US&pincode=${pincode}&date=${date}`, {
        mode: 'cors',
        credentials:'include',
        headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
    })
    console.log(response)
    return response
}

module.exports.callApi = callApi