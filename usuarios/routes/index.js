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

//swagger metadata

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthenticationRequest:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         password:
 *           type: string
 *           description: user password
 *         username:
 *           type: string
 *           description: User identification name. It's setted in sign up page 
 *       example:
 *         password: superSecretPassword123
 *         username: superCoolUsername
 *     User:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: User identification name. It's setted in sign up page 
 *       example:
 *         id: hj019dSAd181sgf79041er81Ñ23gda2
 *         username: superCoolUsername
 *     Message:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         msg:
 *           type: string
 *           description: Status message
 *       example:
 *         msg: User created successfully
 */

/**
  * @swagger
  * tags:
  *   name: Auth
  *   description: authentication for users
  *   name: Project CRUD
  *   description: project creation, modification and remove
  *   name: User CRUD
  *   description: user creation, modification and remove
  *   name: Organization data
  *   description: organization data retrievement
  * 
  */



//swagger routes

/**
 * @swagger
 * /api/user/authenticate:
 *   post:
 *     summary: Authenticate the information for the current user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: user information
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/user/authenticate',User.authenticate)
router.post('/user/authorize',dummyHandle)
/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Invalidate the token for the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: user information
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Message'
 */
router.put('/user/logout',dummyHandle)

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