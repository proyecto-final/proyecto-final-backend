const {handleError} = require('./errors')
const {validationResult} = require('express-validator')
const { check } = require('express-validator')
const User = require('../../models').user


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

  setSecurityValidations (...securityValidations) {
    this.securityValidations = securityValidations
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
    this.handler = handler
    return this
  }

  wrap () {
    if (!this.handler) {
      throw 'You called wrap without setting a handler'
    }
    const wrappedSecurityValidation = async (req, res, next) => {
      const ruleChecks = await Promise.all(this.securityValidations.map(securityValidation => securityValidation(req, res)))
      console.log('RULE CHECKS', ruleChecks)
      if (ruleChecks.every(check => check)){
        next()
      } else {
        res.status(403).send({ msg: ['You don\'t have permissions to perform this action'] })
      }
    }
    const wrappedHandler = async (req, res, ...args) => {
      try {
        await this.handler(req, res, ...args)
      } catch (err) {
        handleError(res, err)
      }
    }
    return [...this.validations, fieldsValidator, wrappedSecurityValidation, wrappedHandler]
  }
}

async function getAndCacheUser(req){
  if (!req.userFromDB){
    req.userFromDB = await User.findOne({
      where: { token: req.token}
    })
  }
  return req.userFromDB
}


const permission = {
  or (...rules) {
    return async (req) => {
      const ruleCheck = await Promise.all([...rules.map(rule => rule(req))])
      console.log('OR WITH', ruleCheck)
      return ruleCheck.some(check => check)
    }
  },
  and (...rules) {
    return async (req) => {
      const ruleCheck = await Promise.all([...rules.map(rule => rule(req))])
      console.log('AND WITH', ruleCheck)
      return ruleCheck.every(check => check)
    }
  },
  isEnabled () {
    return async (req) => {
      const user =  await getAndCacheUser(req)
      return user.enabled
    }
  },
  isAdmin () {
    return async (req) => {
      const user =  await getAndCacheUser(req)
      console.log('IS ADMIN', user.isAdmin)
      return user.isAdmin
    }
  },
  hasAccessToOrganization (){
    return async (req) => {
      const { organizationId } = req.params
      const user =  await getAndCacheUser(req)
      console.log('Has access to org', user.organizationId, organizationId)
      return user.organizationId == organizationId
    }
  },  
  isOwner (){
    return async (req) => {
      const user =  await getAndCacheUser(req)
      return user.role === 'Owner'
    }
  }
}
ControllerHandler.permission = permission

module.exports = ControllerHandler
//new ControllerHandler(handler, R1,R2,R3).wrap()
