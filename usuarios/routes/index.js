const {Router} = require('express')
const router = Router()
const User = require('../controllers/user')
const Organization = require('../controllers/organization')

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
 *         username:
 *           type: string
 *           description: User identification name. It's setted in sign up page 
 *         password:
 *           type: string
 *           description: user password
 *       example:
 *         password: superSecretPassword123
 *         username: superCoolUsername
 *     UserRequest:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         password:
 *           type: string
 *           description: Current user password
 *         newPassword:
 *           type: string
 *           description: New password to be set on the user
 *       example:
 *         password: hj019dSAd181sgf79041er81Ñ23gda2
 *         newPassword: rodriCapo123-
 *     UserDataInfo:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Current user name
 *         name:
 *           type: string
 *           description: user name
 *         email:
 *           type: string
 *           description: user email
 *       example:
 *         name: pepe
 *         email: pepe@gmail.com
 *         username: pepe
 *     UserResponse:
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
  * - name: Auth
  *   description: authentication for users
  * - name: Project CRUD
  *   description: project creation, modification and remove
  * - name: User CRUD
  *   description: user creation, modification and remove
  * - name: Organization data
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
 *                 $ref: '#/components/schemas/UserResponse'
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
router.post('/user/logout',User.logout)

/**
 * @swagger
 * /api/user:
 *   patch:
 *     summary: Updates user information
 *     tags: [User CRUD]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: user information
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/UserResponse'
 */
router.patch('/user',User.update)

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Gets user information
 *     tags: [User CRUD]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: user information
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/UserDataInfo'
 */
router.get('/user/me', User.getSpecific)

/**
 * @swagger
 * /api/organization:
 *   get:
 *     summary: Get organizations
 *     tags: [Organization data]
 *     parameters:
 *      - name: offset
 *        in: query
 *        description: offest of the list
 *        type: number
 *        required: false
 *      - name: limit
 *        in: limit
 *        description: amount of items to be returned
 *        type: number
 *        required: false
 *      - name: name
 *        in: name
 *        description: name of the organization
 *        type: string
 *        required: false
 *      - name: enabled
 *        in: enabled
 *        description: used to filter organizations by enabled status
 *        type: boolean
 *        required: false
 *     responses:
 *       200:
 *         description: user information
 *         content:
 *          application/json:
 *             schema:
 *                 $ref: '#/components/schemas/UserResponse'
 */
router.get('/organization', Organization.get)
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