const express = require("express")
require('dotenv').config()
const { fetchAgain } = require('./functions')

const app = express()
const port = process.env.PORT || 5002

app.get('/', async (req, res) => {
    res.send('Welcome Guest')
})

app.listen(port, () => {
    console.log("App running successfully")
    const interval = setInterval(() => fetchAgain(), 2 * 60 * 1000)
})