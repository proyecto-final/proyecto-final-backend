const { Router } = require('express')
const router = Router()
const { permission } = require('../controllers/utils/requestWrapper')
const ControllerHandler = require('../controllers/utils/requestWrapper')


router.post('/my/endpoint/to/validate', new ControllerHandler()
  .setSecurityValidations(permission.isEnabled()).wrap())


module.exports = router