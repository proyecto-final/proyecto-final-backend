const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const allowedPaths = ['/api/user/authenticate']
  if (allowedPaths.includes(req.path)) {
    return next()
  }
  const token = req.cookies?.auth
  if (!token) {
    return res.status(403).send({ msg: 'Access denied. No token provided.' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    req.token = token
    next()
  } catch (ex) {
    res.status(403).send({ msg: 'Invalid token.' })
  }
}