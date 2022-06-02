const User = require('../models').user;

const authenticate = async(req, resp) => {
    const { body } = req
    console.log('body request recieved: ', body)
    try {
      const user = await User.findOne({
        where: {
            username: body.username,
            password: body.password
        }
    })
    resp.status(200).json({
        msg: 'Mocking Test',
        user
    })
  } catch {
    resp.status(401).json({
        msg: 'Invalid credentials'
    })
  }
    
}

module.exports = {authenticate}