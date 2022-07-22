const { Router } = require('express')
const router = Router()
const { permission } = require('../controllers/utils/userRequestWrapper')
const ControllerHandler = require('../controllers/utils/userRequestWrapper')
const { and, hasAccessToProject, isEnabled} = permission


const crudPermissions = new ControllerHandler()
  .setSecurityValidations(and(isEnabled(), hasAccessToProject())).wrap()
router.post('/project/:projectId/correlate/log',crudPermissions)
router.delete('/project/:projectId/correlate/log/:logId',crudPermissions)
router.patch('/project/:projectId/correlate/log/:logId',crudPermissions)

module.exports = router