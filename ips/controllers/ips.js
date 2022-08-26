const axios = require('axios')
const RequestWrapper = require('../../shared/utils/requestWrapper')
const { getIntValue } = require('./../../shared/utils/dataHelpers')
const {adaptMongoosePage} = require('./../../shared/utils/pagination')
const { check } = require('express-validator')
const { mongoose } = require('mongoose')
const TorList = require('../../shared/models/torList')(mongoose)
const Ip = require('../../shared/models/ip')(mongoose)
const Line = require('./../../shared/models/line')(mongoose)
const Log = require('./../../shared/models/log')(mongoose)
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

const getIpInformationFromIntegrations = async (ip, projectId) => {
  const lastDay = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const existingIp = await Ip.findOne({
    raw: ip,
    projectId,
    createdAt: {
      $gte: lastDay,
    }
  })
  if (existingIp) {
    return existingIp
  }
  const {data: shodanData} = await getIpLocationData(ip)
  const {data: abuseIpData} = await getIpReputation(ip)
  const isTorData = await isTor(ip)
  const {city, country_name, asn } = shodanData
  const { isp, reports, lastReportedAt, abuseConfidenceScore, countryName, totalReports } = abuseIpData.data
  return new Ip({
    raw: ip,
    isTor: isTorData,
    city,
    country: country_name || countryName,
    ISP: isp,
    ASN: asn,
    reports: reports.slice(0, 19),
    totalReports,
    lastReportedAt,
    reputation: abuseConfidenceScore,
    projectId
  })

}

const analyzeIp = new RequestWrapper(
  check('ip', 'ip is required').isIP()
)
  .hasId('projectId')
  .setHandler(async (req, res) => {
    const {ip: rawIp} = req.body
    const projectId =getIntValue(req.params.projectId)
    const lastDay = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const existingIp = await Ip.findOne({
      raw: rawIp,
      projectId,
      createdAt: {
        $gte: lastDay,
      }
    })
    if (existingIp) {
      return res.status(200).json(existingIp)
    } 
    const ip = await getIpInformationFromIntegrations(rawIp, projectId)
    await ip.save()
    res.status(200).json(ip)
  }).wrap()

const analyzeLineIp  = new RequestWrapper(
  check('ip', 'ip is required').isIP()
)
  .hasId('projectId')
  .hasMongoId('logId')
  .hasMongoId('lineId')
  .setHandler(async (req, res) => {
    const {ip: rawIp} = req.body
    const projectId =getIntValue(req.params.projectId)
    const lineId = req.params.lineId
    const logOwner = await Log.findOne({ _id: req.params.logId, projectId: getIntValue(req.params.projectId) })
    if (!logOwner) {
      throw { code: 404, msg: 'Log not found' }
    }
    const line = await Line.findOne({ _id: lineId, 
      log: logOwner._id })
    if (!line) {
      throw {code: 404, msg: 'Line not found'}
    }
    const ip = await getIpInformationFromIntegrations(rawIp, projectId)
    await ip.save()
    line.ip = ip
    await line.save()
    res.status(200).json(ip)
  }).wrap()

const get = new RequestWrapper()
  .handlePagination()
  .hasId('projectId')
  .setHandler(async (req, res) => {
    const { query } = req
    const offset = getIntValue(query.offset)
    const limit = getIntValue(query.limit)
    const projectId =getIntValue(req.params.projectId)
    const mongooseQuery = {
      projectId
    }
    const ips = await Ip.aggregate([
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $facet: {
          paginatedResult: [
            { $match: mongooseQuery },
            { $skip: offset },
            { $limit: limit }
          ],
          totalCount: [
            { $match: mongooseQuery },
            { $count: 'totalCount' }
          ]
        }
      }])
    res.status(200).json(adaptMongoosePage(ips))
  }).wrap()
  
module.exports = {
  getLocationInfo,
  isTorAddress,
  getReputationInfo,
  analyzeIp,
  get,
  analyzeLineIp
}