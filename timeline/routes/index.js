const {Router} = require('express')
const router = Router()
const ModelTestSchema = require('../models/modelTest')

/*TODO: cuando se generen las acciones posta hay que migrarlas a un controller 
        y llamarlas desde aca con un require */
const logInput = async(req, resp) => {
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

const checkDB = async(req, resp) => {

    let connection = true
    try{
        const model = new ModelTestSchema({name: 'name'})
        await model.save();

    } catch(err) {
        connection = false
    }
    return resp.status(connection ? 200 : 500).json({
        msg: connection ? 'sucessfully connected to Mongo DB' : 'Unable to connect with mongoDB'
    })
}

const checkModule = (req, resp) => {
    return resp.status(200).json({
        msg: 'Timeline Module :)'
    })
}

//swagger metadata

/**
 * @swagger
 * components:
 *   schemas:
 *     timelineCreationParams:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         prop1:
 *           type: string
 *           description: prop1
 *         prop2:
 *           type: string
 *           description: prop2 
 *       example:
 *         prop1: prop1example
 *         prop2: prop2example
 *     Timeline:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the timeline
 *         desc:
 *           type: string
 *           description: Timeline description 
 *       example:
 *         id: hj019dSAd181sgf79041er81Ñ23gda2
 *         desc: desc
 */

 /**
  * @swagger
  * tags:
  *   name: Timeline
  *   description: security events timeline
  *   name: Reports
  *   description: timeline reports
  * 
  */

//swagger routes

/**
 * @swagger
 * /api/project/:projectId/timeline:
 *   post:
 *     summary: timeline creation in the project selected
 *     tags: [Timeline]
 *     params:
 *         projectId:
 *          type: Number
 *          desc: new timeline project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/timelineCreationParams'
 *     responses:
 *       200:
 *         description: created timeline information
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Timeline'
 */


//NOTA: cuando lo vayan a usar este projectId recuerden que viene adentro de req.params como {projectId: value}
router.get('/project/:projectId/timeline',[], logInput)
router.post('/project/:projectId/timeline',[], logInput)

router.get('/project/:projectId/timeline/:timelineId',[], logInput)
router.patch('/project/:projectId/timeline/:timelineId',[], logInput)
router.delete('/project/:projectId/timeline/:timelineId',[], logInput)

router.get('/project/:projectId/log/:logId/timeline/:timelineId/report',[], logInput)
router.get('/checkDB',[], checkDB)
router.get('/checkModule',[], checkModule)


module.exports = router