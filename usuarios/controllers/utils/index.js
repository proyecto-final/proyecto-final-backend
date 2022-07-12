//to be move
const jwt = require('jsonwebtoken')

function generateToken(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: TOKEN_LIFETIME_IN_SECONDS}).toString()
  return token
}

const isExpired = (token) => {
    return !jwt.verify(token)
}


module.exports = {generateToken,isExpired}