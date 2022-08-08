const {Router} = require('express')
const router = Router()
const Log = require('../controllers/log')
const Line = require('../controllers/line')
const Vulnerability = require('../controllers/vulnerability')


router.post('/project/:projectId/correlate/log',[], Log.create)
router.delete('/project/:projectId/correlate/log/:logId',[], Log.destroy)
router.get('/project/:projectId/correlate/log',[], Log.get)
router.patch('/project/:projectId/correlate/log/:logId',[], Log.update)
router.get('/project/:projectId/correlate/log/:logId/line',[], Line.get)
router.get('/project/:projectId/correlate/vulnerability',[], Vulnerability.get)
router.post('/project/:projectId/correlate/vulnerability',[], Vulnerability.create)


module.exports = router