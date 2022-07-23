const { Router } = require('express')
const router = Router()
const { permission } = require('../controllers/utils/userRequestWrapper')
const ControllerHandler = require('../controllers/utils/userRequestWrapper')
const { and, hasAccessToProject, isEnabled} = permission


const userCrudPermission = new ControllerHandler()
  .setSecurityValidations(and(isEnabled(), hasAccessToProject())).wrap()
router.post('/project/:projectId/correlate/log',userCrudPermission)
router.get('/project/:projectId/correlate/log',userCrudPermission)
router.delete('/project/:projectId/correlate/log/:logId',userCrudPermission)
router.patch('/project/:projectId/correlate/log/:logId',userCrudPermission)

module.exports = router