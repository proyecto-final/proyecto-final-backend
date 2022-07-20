const {handleError} = require('./errors')
const {validationResult, check} = require('express-validator')

const fieldsValidator = (req,res,next) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json({
      msg: error.array().map(error => error.msg)
    })
  }
  next()
}

class RequestWrapper {
  constructor (...validations) {
    this.validations = validations
    this.securityValidations = []
    this.handler = (req, resp) => {
      resp.status(200).send({ msg: 'Passed' })
    }
  }

  setSecurityValidations (...securityValidations) {
    this.securityValidations = securityValidations
    return this
  }

  notEmptyValues (fields) {
    this.validations.push(
      fields.map(field => check(field, `El ${field} debe tener un valor`).not().isEmpty())
    )
    return this
  }

  hasId(field) {
    this.validations.push(
      check(field, `El ${field} debe ser un numero mayor a cero`).isInt({min: 1}),
    )
    return this
  }

  handlePagination () {
    this.validations.push(
      check('limit', 'El limit debe ser un numero mayor a cero').isInt({min: 1}),
      check('offset', 'El offset debe ser un numero mayor a cero').isInt({min: 0})
    )
    return this
  }

  setHandler (handler) {
    this.handler = async (req, res, ...args) => {
      try {
        await handler(req, res, ...args)
      } catch (err) {
        handleError(res, err)
      }
    }
    return this
  }

  wrap () {
    if (!this.handler) {
      throw 'You called wrap without setting a handler'
    }
    
    return [...this.validations, fieldsValidator, this.getSecurityValidation(), this.handler].filter(val => val)
  }

  getSecurityValidation () {
  }
}
ControllerHandler.permission = permission



module.exports = RequestWrapper
//new RequestWrapper(handler, R1,R2,R3).wrap()
