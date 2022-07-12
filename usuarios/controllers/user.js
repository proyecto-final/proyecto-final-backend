const User = require('../models').user
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const ControllerHandler = require('../controllers/utils/requestWrapper')
const {handleError} = require('./utils/errors')

const TOKEN_LIFETIME_IN_SECONDS =  60 * 60 * 24 * 7
const TOKEN_LIFETIME_IN_MILISECONDS = TOKEN_LIFETIME_IN_SECONDS * 1000

// Business
function generateToken(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: TOKEN_LIFETIME_IN_SECONDS}).toString()
  return token
}

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
async function findUserOrThrowBy (params) {
  const user = await User.findOne({
    where: params
  })
  if (!user) {
    throw { msg: 'Invalid credentials', code: 403 }
  }
  return user
}

const authenticate = new ControllerHandler().setHandler(async(req, resp) => {
  const { body } = req
    const user = await findUserOrThrowBy({
      username: body.username,
      password: hash(body.password)
    })
    const token = generateToken(user)
    await user.update({ token })
    resp.status(200).cookie('auth', token, {
      httpOnly: true,
      maxAge: TOKEN_LIFETIME_IN_MILISECONDS
    }).json(user)
}).wrap()


const logout = new ControllerHandler().setHandler(async(req, resp) => {
    const token = req.token
    const user = await findUserOrThrowBy({ token })
    await user.update({ token: null })
    resp.status(200).cookie('auth', '', {
      httpOnly: true,
      maxAge: 0
    }).json({ msg: 'OK' })
}).wrap()

const update = new ControllerHandler().setHandler(async(req, resp) => {
    const token = req.token
    const { password, newPassword }=  req.body
    const user = await findUserOrThrowBy({ token })
    let data2Update = {}
    if (password) {
      if (hash(password) !== user.password) {
        throw {code: 403, msg: 'Invalid credentials'}
      }
      checkPassword(newPassword)
      data2Update.password = hash(newPassword)
    }
    await user.update(data2Update)
    resp.status(200).json({ msg: 'OK' })
}).wrap()

const getSpecific = new ControllerHandler().setHandler(async(req, resp) => {
    const token = req.token
    const user = await findUserOrThrowBy({ token })
    resp.status(200).json(user)
}).wrap()

module.exports = {authenticate, logout, update, getSpecific}