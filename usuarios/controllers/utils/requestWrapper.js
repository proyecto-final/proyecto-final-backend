const {handleError} = require('./errors')
const {validationResult} = require('express-validator')
const { check } = require('express-validator')
const User = require('../models').user


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
  constructor (...validations) {
    this.validations = validations
    this.securityValidations = []
  }

  checkIsAdmin (){
    this.securityValidations.push(async (req, resp, next) => {
      const user =  await this.getAndCacheUser(req)
      if (!user.isAdmin){
        resp.status(403).send({ msg:'You don\'t have permissions to perform this action' })
        return
      }
      next()
    })
    return this
  }

  async getAndCacheUser(req){
    if (!req.user){
      req.user = await User.findOne({
        where: { token: req.token}
      })
    }
    return req.user
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
    this.handler = handler
    return this
  }

  wrap () {
    if (!this.handler) {
      throw 'You called wrap without setting a handler'
    }
    const wrappedHandler = async (req, res, ...args) => {
      try {
        await this.handler(req, res, ...args)
      } catch (err) {
        handleError(res, err)
      }
    }
    return [...this.securityValidations ,...this.validations, fieldsValidator, wrappedHandler]
  }
}

module.exports = ControllerHandler
//new ControllerHandler(handler, R1,R2,R3).wrap()
