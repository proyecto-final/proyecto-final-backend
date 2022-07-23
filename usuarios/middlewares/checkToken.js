const jwt = require('jsonwebtoken')
const User = require('../models').user

module.exports = async function (req, res, next) {
  const allowedPaths = ['/api/user/authenticate', '/api-docs', '/api/organization/validate-invitation-token', '/api/organization/user']
  if (allowedPaths.some(path => req.path.includes(path))) {
    return next()
  }
  const token = req.cookies?.auth
  if (!token) {
    return res.status(401).send({ msg: 'Access denied. No token provided.' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    req.token = token
    if (!(await User.findOne({ where: { token }}))) {
      return res.status(401).send({ msg: 'Access denied. No token provided.' })
    }
    next()
  } catch (ex) {
    res.status(401).send({ msg: 'Invalid token.' })
  }
}
