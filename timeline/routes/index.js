const {Router} = require('express')
const router = Router()
const Timeline = require('../controllers/timeline')

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
router.post('/project/:projectId/timeline',[], Timeline.create)
router.delete('/project/:projectId/timeline/:timelineId',[], Timeline.destroy)
router.patch('/project/:projectId/timeline/:timelineId',[], Timeline.update)

router.get('/project/:projectId/timeline',[], Timeline.get)
router.get('/project/:projectId/timeline/:timelineId',[], Timeline.getSpecific)
router.post('/project/:projectId/log/:logId/timeline/:timelineId/report',[], Timeline.report)


module.exports = router