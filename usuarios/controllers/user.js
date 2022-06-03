const User = require('../models').user
const crypto = require("crypto")

const TOKEN_LIFETIME = 1000 * 60 * 60 * 24 * 7

function getToken(length = 64) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
 }
 return result
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
    const token = getToken()
    await user.update({ token })
    resp.status(200).cookie('auth', token, {
      httpOnly: true,
      maxAge: TOKEN_LIFETIME
    }).json(user)
  } catch (err) {
    resp.status(401).json({
      msg: 'Invalid credentials'
    })
  }
}

module.exports = {authenticate}