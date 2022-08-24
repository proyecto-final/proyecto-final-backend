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

const isTor = async (ip) => {
  const torNode = await TorList.findOne({ip})
  return !!torNode
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

const isTorAddress = new RequestWrapper(
  check('ip', 'ip is required').isIP()
).setHandler(async (req, res) => {
  const {ip} = req.query
  res.status(200).json({isTor: await isTor(ip)})
}).wrap()

const analyzeIp = new RequestWrapper(
  check('ip', 'ip is required').isIP()
)
  .hasMongoId('logId')
  .hasId('projectId')
  .setHandler(async (req, res) => {
    const {ip} = req.query
    const {data: shodanData} = await getIpLocationData(ip)
    const {data: abuseIpData} = await getIpReputation(ip)
    const isTor = await isTor(ip)
    res.status(200).json({shodanData, abuseIpData, isTor})
  }).wrap()

module.exports = {
  getLocationInfo,
  isTorAddress,
  getReputationInfo,
  analyzeIp
}