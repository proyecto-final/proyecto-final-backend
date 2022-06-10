const {Router} = require('express')
const router = Router()
const User = require('../controllers/user')

/*TODO: cuando se generen las acciones posta hay que migrarlas a un controller 
        y llamarlas desde aca con un require */
const dummyHandle = async(req, resp) => {
    const {body, query, params} = req
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
router.post('/user/authenticate', User.authenticate)
router.post('/user/logout', User.logout)
router.patch('/user/user',User.update)

router.get('/organization',dummyHandle)
router.post('/organization',dummyHandle)

//NOTE: remember that organizationId comes inside req.params as {organizationId: value}
router.get('/organization/:organizationId',dummyHandle)
router.put('/organization/:organizationId',dummyHandle)

router.post('/organization/:organizationId/generate-link',dummyHandle)
router.post('/organization/:organizationId/user',dummyHandle)

router.put('/organization/:organizationId/user/:userId',dummyHandle)
router.delete('/organization/:organizationId/user/:userId',dummyHandle)

router.post('/organization/:organizationId/project',dummyHandle)
router.get('/organization/:organizationId/project',dummyHandle)

router.get('/organization/:organizationId/project/:projectId',dummyHandle)
router.patch('/organization/:organizationId/project/:projectId',dummyHandle)


module.exports = router