const axios = require('axios')
const RequestWrapper = require('../../shared/utils/requestWrapper')
const { check } = require('express-validator')
const TorList = require('../../shared/models/torList')


const SHODAN_API_KEY = process.env.SHODAN_API_KEY
const ABUSEIP_API_KEY = process.env.ABUSEIP_API_KEY

const getIpLocationData = async (ip) => {
    try {
        return await axios.get(`https://api.shodan.io/shodan/host/${ip}?key=${SHODAN_API_KEY}`)
    } catch (err){
        throw {code: err.response?.status || 500, msg: err.message || 'Integration with Shodan failed'} 
    }
}

const getIpReputation = async (ip) => {
    try {
        return await axios.get(`https://api.abuseipdb.com/api/v2/check?maxAgeInDays=90&verbose&ipAddress=${ip}`, {headers: {Key: ABUSEIP_API_KEY, Accept: 'application/json'}})
    } catch(err) {
        throw {code: err.response?.status || 500, msg: err.message || 'Integration with AbuseIp failed'} 
    }
}

const getLocationInfo = new RequestWrapper(
    check('ip', 'ip is required').isIP()
).setHandler(async (req, res) => {
    const {ip} = req.query
    const {data} = await getIpLocationData(ip)
    res.status(200).json(data)
}).wrap()


const getReputationInfo = new RequestWrapper(
    check('ip', 'ip is required').isIP()
).setHandler(async (req, res) => {
    const {ip} = req.query
    const {data} = await getIpReputation(ip)
    res.status(200).json(data)
}).wrap()

const isTorAddress = new RequestWrapper().setHandler(async (req, res) => {
    const {ip} = req.query
    const torNode = await TorList.findOne({ip})
    res.status(200).json({isTor: !!torNode})
}).wrap()


module.exports = {
    getLocationInfo,
    isTorAddress,
    getReputationInfo
}