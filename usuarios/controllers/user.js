const User = require('../models').user
const crypto = require("crypto")

const authenticate = async(req, resp) => {
  const { body } = req
  console.log('body request recieved: ', body)
  console.log('hashed', crypto.createHash('sha256').update(body.password).digest('hex'))
  try {
    const user = await User.findOne({
      where: {
          username: body.username,
          password: crypto.createHash('sha256').update(body.password).digest('hex')
      }
    })
    console.log(user)
    resp.status(200).json({
      msg: 'Mocking Test',
      user
    })
  } catch (err) {
    console.log(err)
    resp.status(401).json({
      msg: 'Invalid credentials'
    })
  }
}

module.exports = {authenticate}