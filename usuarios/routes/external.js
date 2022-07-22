const { Router } = require('express')
const router = Router()
const { permission } = require('../controllers/utils/userRequestWrapper')
const ControllerHandler = require('../controllers/utils/userRequestWrapper')
const { and, hasAccessToProject, isEnabled} = permission


router.post('/project/:projectId/correlate/log',new ControllerHandler()
  .setSecurityValidations(and(isEnabled(), hasAccessToProject())).wrap())
router.delete('/project/:projectId/correlate/log/:logId',new ControllerHandler()
  .setSecurityValidations(and(isEnabled(), hasAccessToProject())).wrap())
router.patch('/project/:projectId/correlate/log/:logId',new ControllerHandler()
  .setSecurityValidations(and(isEnabled(), hasAccessToProject())).wrap())

module.exports = router