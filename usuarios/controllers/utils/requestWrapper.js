const {handleError} = require('./errors')
const {validationResult} = require('express-validator')


const fieldsValidator = (req,res,next) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({
      msg: error.array().map(error => error.msg)
    })
  }
  next()
}

class ControllerHandler {
  constructor (handler, ...validations) {
    this.handler = handler
    this.validations = [...validations, fieldsValidator]
  }

  wrap () {
    const wrappedHandler = async (req, res, ...args) => {
      try {
        await this.handler(req, res, ...args)
      } catch (err) {
        handleError(res, err)
      }
    }
    return [...this.validations, wrappedHandler]
  }
}

module.exports = ControllerHandler
//new ControllerHandler(handler, R1,R2,R3).wrap()
