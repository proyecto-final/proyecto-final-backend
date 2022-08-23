const axios = require('axios')
const RequestWrapper = require('../../shared/utils/requestWrapper')
const { check } = require('express-validator')

const SHODAN_API_KEY = process.env.SHODAN_API_KEY

const getLocationInfo = new RequestWrapper(
    check('ip', 'ip is required').isIP()
).setHandler(async (req, res) => {
    const {ip} = req.query
    const {data} = await axios.get(`https://api.shodan.io/shodan/host/${ip}?key=${SHODAN_API_KEY}`)
    res.status(200).json(data)
}).wrap()



module.exports = {
    getLocationInfo
}