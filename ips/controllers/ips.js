const axios = require('axios')
const RequestWrapper = require('../../shared/utils/requestWrapper')
const { check } = require('express-validator')
const { mongoose } = require('mongoose')
const TorList = require('../../shared/models/torList')(mongoose)
const Ip = require('../../shared/models/ip')(mongoose)
const SHODAN_API_KEY = process.env.SHODAN_API_KEY
const ABUSEIP_API_KEY = process.env.ABUSEIP_API_KEY

const getIpLocationData = async (ip) => {
  try {
    return await axios.get(`https://api.shodan.io/shodan/host/${ip}?key=${SHODAN_API_KEY}`)
  } catch (err){
    if (err.response?.status === 404) {
      return {data: {}}
    } 
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

const getIpInformationFromIntegrations = async ip => {
  const {data: shodanData} = await getIpLocationData(ip)
  const {data: abuseIpData} = await getIpReputation(ip)
  const isTorData = await isTor(ip)
  const {city, country_name, asn } = shodanData
  const { isp, reports, lastReportedAt, abuseConfidenceScore, countryName } = abuseIpData.data
  return new Ip({
    raw: ip,
    isTor: isTorData,
    city,
    country: country_name || countryName,
    ISP: isp,
    ASN: asn,
    reports,
    lastReportedAt,
    reputation: abuseConfidenceScore
  })

}

const analyzeIp = new RequestWrapper(
  check('ip', 'ip is required').isIP()
)
  .hasId('projectId')
  .setHandler(async (req, res) => {
    const {ip} = req.body
    const ipInformation = await getIpInformationFromIntegrations(ip)
    ipInformation.projectId = req.params.projectId
    res.status(200).json(ipInformation)
  }).wrap()

module.exports = {
  getLocationInfo,
  isTorAddress,
  getReputationInfo,
  analyzeIp
}