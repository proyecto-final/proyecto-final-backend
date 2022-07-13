const { Router } = require('express')
const router = Router()
const User = require('../controllers/user')
const Organization = require('../controllers/organization')
const Project = require('../controllers/project')

/*TODO: cuando se generen las acciones posta hay que migrarlas a un controller 
        y llamarlas desde aca con un require */
const dummyHandle = async (req, resp) => {
  const { body, query, params } = req
  console.log('request recieved: ', req)
  console.log('body request recieved: ', body)
  console.log('query request recieved: ', query)
  console.log('params request recieved: ', params)
  resp.status(200).json({
    msg: 'Mocking Test',
    request: {
      body,
      query,
      params
    }
  })
}


// routes
// users
router.post('/user/authenticate', User.authenticate)
router.post('/user/authorize', dummyHandle)
router.post('/user/logout', User.logout)
router.patch('/user', User.update)
router.get('/user/me', User.getSpecific)
//organizations
router.get('/organization', Organization.get)
router.post('/organization', Organization.create)
router.patch('/organization/:organizationId', Organization.update)
router.get('/organization/:organizationId', Organization.getSpecific)
router.get('/organization/:organizationId/user', Organization.getUsers)
router.post('/organization/:organizationId/invitation-token', Organization.generateInvitationToken)
router.post('/organization/validate-invitation-token', Organization.validateToken)
router.post('/organization/user', User.create) 
// projects
router.get('/organization/:organizationId/project', Project.get)
router.post('/organization/:organizationId/project', Project.create)
router.get('/organization/:organizationId/project/:projectId', dummyHandle)
router.patch('/organization/:organizationId/project/:projectId', Project.update)
router.delete('/organization/:organizationId/project/:projectId', Project.destroy)

router.patch('/organization/:organizationId/user/:userId', Organization.updateUser)
router.delete('/organization/:organizationId/user/:userId', dummyHandle)






module.exports = router