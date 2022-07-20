const { Router } = require('express')
const router = Router()
const { permission } = require('../controllers/utils/userRequestWrapper')
const ControllerHandler = require('../controllers/utils/userRequestWrapper')


router.post('/my/endpoint/to/validate', new ControllerHandler()
  .setSecurityValidations(permission.isEnabled()).wrap())


module.exports = router