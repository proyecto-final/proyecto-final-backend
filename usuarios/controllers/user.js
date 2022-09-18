const User = require('../models').user
const Project = require('../models').project
const speakeasy = require('speakeasy')
const crypto = require('crypto')
const { permission } = require('../controllers/utils/userRequestWrapper')
const ControllerHandler = require('../controllers/utils/userRequestWrapper')
const Organization = require('../models').organization
const {generateToken} = require('../controllers/utils')
// Business
const TOKEN_LIFETIME_IN_MILISECONDS = 60 * 60 * 24 * 7 * 1000

function hash (password) {
  try{
    return crypto.createHash('sha256').update(password).digest('hex')
  }catch(err){
    throw {code: 403, msg: 'Invalid credentials'}
  }
}

function checkPassword (password) {
  if (password.length < 8) {
    throw {code: 400, msg: 'Password must be at least 8 characters long'}
  } else if (!/[a-z]/.test(password)) {
    throw {code: 400, msg: 'Password must contain at least one lowercase letter'}
  } else if (!/[A-Z]/.test(password)) {
    throw {code: 400, msg: 'Password must contain at least one uppercase letter'}
  } else if (!/[0-9]/.test(password)) {
    throw {code: 400, msg: 'Password must contain at least one number'}
  } else if (!/[^a-zA-Z0-9]/.test(password)) {
    throw {code: 400, msg: 'Password must contain at least one special character'}
  } else if (password.length > 64) {
    throw {code: 400, msg: 'Password must be at most 64 characters long'}
  }
}

// DB
async function findUserOrThrowBy (params, withProjects = false) {
  const include = withProjects ? [{
    model: Project,
    attributes: ['name', 'prefix', 'color', 'id'],
    through: {
      attributes: []
    }
  }] : []
  const user = await User.findOne({
    where: params,
    include
  })
  if (!user) {
    throw { msg: 'Invalid credentials', code: 403 }
  }
  return user
}
const MAX_ALLOWED_ATTEMPTS = 5
const authenticate = new ControllerHandler()
  .setHandler(async(req, resp) => {
    const { body } = req
    const user = await findUserOrThrowBy({
      username: body.username
    }, true)
    if (user.attemptsCount >= MAX_ALLOWED_ATTEMPTS) {
      throw { msg: 'Account blocked. Too many attempts', code: 403 }
    }
    if (user.password !== hash(body.password)) {
      await user.update({ attemptsCount:user.attemptsCount + 1 })
      throw { msg: 'Invalid credentials', code: 403 }
    }
    if (!user.enabled) {
      throw { msg: 'User is disabled', code: 403 }
    }
    const organization = await Organization.findOne({
      where: { id: user.organizationId }
    })
    if (!organization?.enabled) {
      throw { msg: 'Organization is disabled', code: 403 }
    }
    const token = generateToken(user.id)
    await user.update({ token, attemptsCount: 0 })
    resp.status(200).cookie('auth', token, {
      httpOnly: true,
      maxAge: TOKEN_LIFETIME_IN_MILISECONDS,
      secure: process.env.ENVIRONMENT==='PROD',
      sameSite: process.env.ENVIRONMENT==='PROD' ? 'none' : undefined
    }).json(user)
  }).wrap()

const logout = new ControllerHandler()
  .setHandler(async(req, resp) => {
    const token = req.token
    const user = await findUserOrThrowBy({ token })
    await user.update({ token: null })
    resp.status(200).cookie('auth', '', {
      httpOnly: true,
      maxAge: 0
    }).json({ msg: 'OK' })
  }).wrap()

const update = new ControllerHandler()
  .setSecurityValidations(permission.isEnabled())
  .setHandler(async(req, resp) => {
    const token = req.token
    const { password, newPassword }=  req.body
    const user = await findUserOrThrowBy({ token })
    let data2Update = {}
    if (password) {
      if (hash(password) !== user.password) {
        throw {code: 401, msg: 'Invalid credentials'}
      }
      checkPassword(newPassword)
      data2Update.password = hash(newPassword)
    }
    await user.update(data2Update)
    resp.status(200).json({ msg: 'OK' })
  }).wrap()

const getSpecific = new ControllerHandler()
  .setSecurityValidations(permission.isEnabled())
  .setHandler(async(req, resp) => {
    const token = req.token
    const user = await findUserOrThrowBy({ token }, true)
    resp.status(200).json(user)
  }).wrap()

const create = new ControllerHandler().notEmptyValues(['username','password','email','token','name'])
  .setHandler(async(req, resp) => {
    const {username, password, name, email, token, mfaSecret} = req.body
    checkPassword(password)
    const organization = await Organization.findOne({where: {invitationToken: token}})
    if(!organization){
      throw {code: 403, msg: 'Token inválido'}
    }
    const organizationId = organization.id
    const user = await new User({username, password, name, email, organizationId, mfaSecret})
    await user.save()
    resp.status(200).json(user)
  }).wrap()

const verifyMfa = new ControllerHandler()
  .setHandler(async(req, resp) => {
    const { body } = req
    const user = await findUserOrThrowBy({
      username: body.username
    }, true)
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: req.userCode
    })
    if (!verified) {
      throw { msg: 'Código inválido, ingreselo nuevamente', code: 403 }
    }
    resp.status(200).json({verified: true})
  }).wrap()

module.exports = {authenticate, logout, update, getSpecific, create, verifyMfa}