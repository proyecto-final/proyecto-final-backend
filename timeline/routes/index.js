const {Router} = require('express')
const router = Router()
const Timeline = require('../controllers/timeline')

router.post('/project/:projectId/timeline',[], Timeline.create)
router.delete('/project/:projectId/timeline/:timelineId',[], Timeline.destroy)
router.patch('/project/:projectId/timeline/:timelineId',[], Timeline.update)

router.get('/project/:projectId/timeline',[], Timeline.get)
router.get('/project/:projectId/timeline/:timelineId',[], Timeline.getSpecific)
router.get('/project/:projectId/log/:logId/timeline/:timelineId/report',[], Timeline.getReport)


module.exports = router