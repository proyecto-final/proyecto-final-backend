const {Router} = require('express')
const router = Router()
const Log = require('../controllers/log')

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




//NOTA: cuando lo vayan a usar este projectId recuerden que viene adentro de req.params como {projectId: value}
router.post('/project/:projectId/correlate/log',[], Log.create)
router.delete('/project/:projectId/correlate/log/:logId',[], Log.destroy)
router.get('/project/:projectId/correlate/log',[], logInput)

router.patch('/project/:projectId/correlate/log/:logId',[], logInput)
router.get('/project/:projectId/correlate/log/:logId',[], logInput)

router.patch('/project/:projectId/correlate/log/:logId/line/:lineId',[], logInput)

router.get('/project/:projectId/correlate/vulnerability',[], logInput)


module.exports = router