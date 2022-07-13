//to be move
const jwt = require('jsonwebtoken')
const TOKEN_LIFETIME_IN_SECONDS =  60 * 60 * 24 * 7

function generateToken(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: TOKEN_LIFETIME_IN_SECONDS}).toString()
  return token
}

module.exports = {generateToken}