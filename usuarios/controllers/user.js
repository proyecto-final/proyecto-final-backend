const User = require('../models').user
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const TOKEN_LIFETIME_IN_SECONDS =  60 * 60 * 24 * 7
const TOKEN_LIFETIME_IN_MILISECONDS = TOKEN_LIFETIME_IN_SECONDS * 1000

function generateToken(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: TOKEN_LIFETIME_IN_SECONDS}).toString()
  return token
}

function hash (password) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

const authenticate = async(req, resp) => {
  const { body } = req
  try {
    const user = await User.findOne({
      where: {
          username: body.username,
          password: hash(body.password)
      }
    })
    if (!user) {
      throw 'User not found'
    }
    const token = generateToken(user)
    await user.update({ token })
    resp.status(200).cookie('auth', token, {
      httpOnly: true,
      maxAge: TOKEN_LIFETIME_IN_MILISECONDS
    }).json(user)
  } catch (err) {
    resp.status(401).json({
      msg: 'Invalid credentials'
    })
  }
}

const logout = async(req, resp) => {
  try {
    const token = req.token
    const user = await User.findOne({
      where: {
        token
      }
    })
    if (!user) {
      throw 'User not found'
    }
    await user.update({ token: null })
    resp.status(200).cookie('auth', '', {
      httpOnly: true,
      maxAge: 0
    }).json({ msg: 'OK' })
  } catch (err) {
    resp.status(403).json({
      msg: 'Invalid credentials'
    })
  }
}

module.exports = {authenticate, logout}