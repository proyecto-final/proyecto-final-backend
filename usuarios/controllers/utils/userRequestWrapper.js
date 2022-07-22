const User = require('../../models').user
const Project = require('../../models').project
const RequestWrapper = require('../../../shared/utils/requestWrapper')

class UserRequestWrapper extends RequestWrapper {
  constructor (...validations) {
    super(...validations)
  }

  getSecurityValidation () {
    const wrappedSecurityValidation = async (req, res, next) => {
      const ruleChecks = await Promise.all(this.securityValidations.map(securityValidation => securityValidation(req, res)))
      if (ruleChecks.every(check => check)){
        next()
      } else {
        res.status(403).send({ msg: ['You don\'t have permissions to perform this action'] })
      }
    }
    return wrappedSecurityValidation
  }
}

function getAndCacheUser(req){
  if (!req.userFromDBPromise){
    req.userFromDBPromise = User.findOne({
      where: { token: req.token},
      includes: {
        model: Project,
        attributes: ['id'],
        through: {
          attributes: []
        }
      }
    })
  }
  return req.userFromDBPromise
}

const permission = {
  or (...rules) {
    return async (req) => {
      const ruleCheck = await Promise.all([...rules.map(rule => rule(req))])
      return ruleCheck.some(check => check)
    }
  },
  and (...rules) {
    return async (req) => {
      const ruleCheck = await Promise.all([...rules.map(rule => rule(req))])
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
      return user.isAdmin
    }
  },
  hasAccessToOrganization (){
    return async (req) => {
      const { organizationId } = req.params
      const user =  await getAndCacheUser(req)
      return user.organizationId == organizationId
    }
  },  
  isOwner (){
    return async (req) => {
      const user =  await getAndCacheUser(req)
      return user.role === 'Owner'
    }
  },
  hasAccessToProject (){
    return async (req) => {
      const user =  await getAndCacheUser(req)
      return  user.projects.some(aProject => aProject.id === req.params.project)
    }
  }
}
UserRequestWrapper.permission = permission

module.exports = UserRequestWrapper
