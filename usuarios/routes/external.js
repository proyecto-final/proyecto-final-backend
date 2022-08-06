const { Router } = require('express')
const router = Router()
const { permission } = require('../controllers/utils/userRequestWrapper')
const ControllerHandler = require('../controllers/utils/userRequestWrapper')
const { and, hasAccessToProject, isEnabled} = permission


const userCrudPermission = new ControllerHandler()
  .setSecurityValidations(and(isEnabled(), hasAccessToProject())).wrap()

//CORRELATION
router.post('/project/:projectId/correlate/log',userCrudPermission)
router.get('/project/:projectId/correlate/log',userCrudPermission)
router.delete('/project/:projectId/correlate/log/:logId',userCrudPermission)
router.patch('/project/:projectId/correlate/log/:logId',userCrudPermission)
router.get('/project/:projectId/correlate/vulnerability',userCrudPermission)
router.post('/project/:projectId/correlate/vulnerability',userCrudPermission)
//TIMELINE
router.post('/project/:projectId/timeline/',userCrudPermission)
router.get('/project/:projectId/timeline/',userCrudPermission)
router.get('/project/:projectId/timeline/:timelineId',userCrudPermission)
router.delete('/project/:projectId/timeline/:timelineId',userCrudPermission)
router.patch('/project/:projectId/timeline/:timelineId',userCrudPermission)
router.get('/project/:projectId/log/:logId/timeline/:timelineId/report',userCrudPermission)

module.exports = router