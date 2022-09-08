const {Router} = require('express')
const router = Router()
const Ip = require('../controllers/ips')

router.post('/project/:projectId/ip-analysis',[], Ip.analyzeIp)
router.post('/project/:projectId/ip-analysis/log/:logId/line/:lineId',[], Ip.analyzeLineIp)
router.get('/project/:projectId/ip-analysis',[], Ip.get)
router.get('/project/:projectId/ip-analysis/shodan', Ip.getLocationInfo)
router.get('/project/:projectId/ip-analysis/tor', Ip.isTorAddress)
router.get('/project/:projectId/ip-analysis/abuseIP', Ip.getReputationInfo)

module.exports = router