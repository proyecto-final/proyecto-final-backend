const {Router, json} = require('express')
const router = Router()
const Log = require('../controllers/log')
const Line = require('../controllers/line')
const Vulnerability = require('../controllers/vulnerability')


const logInput = (req, resp) => {
  const {body, query,params} = req
  return resp.status(200).json({body, query,params})
}

router.post('/project/:projectId/correlate/log',[], Log.create)
router.delete('/project/:projectId/correlate/log/:logId',[], Log.destroy)
router.get('/project/:projectId/correlate/log',[], Log.get)
router.patch('/project/:projectId/correlate/log/:logId',[], Log.update)
router.get('/project/:projectId/correlate/log/:logId/line',[], Line.get)
router.patch('/project/:projectId/correlate/log/:logId/line/:lineId',[], Line.update)
router.get('/project/:projectId/correlate/vulnerability',[], Vulnerability.get)
router.post('/project/:projectId/correlate/vulnerability',[], Vulnerability.create)
router.get('/project/:projectId/correlate/vulnerability/test1',[], Vulnerability.test)
router.get('/project/:projectId/correlate/vulnerability/test',[], logInput)


module.exports = router