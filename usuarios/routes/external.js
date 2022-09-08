const { Router } = require('express')
const router = Router()
const { permission } = require('../controllers/utils/userRequestWrapper')
const ControllerHandler = require('../controllers/utils/userRequestWrapper')
const { and, hasAccessToProject, isEnabled} = permission


const userCrudPermission = new ControllerHandler()
  .setSecurityValidations(and(isEnabled(), hasAccessToProject())).wrap()
const noPermission = new ControllerHandler().wrap()

//CORRELATION
router.post('/project/:projectId/correlate/log',userCrudPermission)
router.post('/project/:projectId/correlate/log/:logId/markAsSelected',userCrudPermission)
router.get('/project/:projectId/correlate/log',userCrudPermission)
router.delete('/project/:projectId/correlate/log/:logId',userCrudPermission)
router.patch('/project/:projectId/correlate/log/:logId',userCrudPermission)
router.patch('/project/:projectId/correlate/log/:logId/line/:lineId',userCrudPermission)
router.get('/project/:projectId/correlate/vulnerability',userCrudPermission)
router.post('/project/:projectId/correlate/vulnerability',userCrudPermission)
router.get('/project/:projectId/correlate/log/:logId/line',userCrudPermission)
router.patch('/project/:projectId/correlate/log/:logId/line/:lineId',userCrudPermission)
//TIMELINE
router.post('/project/:projectId/timeline/',userCrudPermission)
router.get('/project/:projectId/timeline/',userCrudPermission)
router.get('/project/:projectId/timeline/:timelineId',userCrudPermission)
router.post('/project/:projectId/timeline/:timelineId',userCrudPermission)
router.delete('/project/:projectId/timeline/:timelineId',userCrudPermission)
router.patch('/project/:projectId/timeline/:timelineId',userCrudPermission)
router.get('/project/:projectId/timeline/:timelineId/report',userCrudPermission)
router.post('/project/:projectId/timeline/:timelineId/refresh',[], userCrudPermission)
router.post('/project/:projectId/timeline/:timelineId/generate-token',userCrudPermission)
router.get('/project/:nothing/timeline/external/:token', noPermission)
router.post('/project/:projectId/timeline/:timelineId/refresh',[], userCrudPermission)

router.get('/project/:projectId/ip-analysis/shodan', [],userCrudPermission)
router.get('/project/:projectId/ip-analysis/tor', [],userCrudPermission)
router.get('/project/:projectId/ip-analysis/abuseIP', [], userCrudPermission)
router.post('/project/:projectId/ip-analysis', [], userCrudPermission)
router.get('/project/:projectId/ip-analysis/log/:logId', [], userCrudPermission)
router.get('/project/:projectId/ip-analysis',[], userCrudPermission)
router.post('/project/:projectId/ip-analysis/log/:logId/line/:lineId',[], userCrudPermission)


module.exports = router