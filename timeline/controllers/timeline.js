const RequestWrapper = require('../../shared/utils/requestWrapper')
const { getIntValue } = require('../../shared/utils/dataHelpers')
const { check} = require('express-validator')
const mongoose = require('mongoose')
const Timeline = require('../../shared/models/timeline')(mongoose)
const TimelineLine = require('../../shared/models/timelineLine')(mongoose)
const Log = require('../../shared/models/log')(mongoose)
const Line = require('../../shared/models/line')(mongoose)
// const {adaptMongoosePage} = require('../../shared/utils/pagination')

const validateTimeline = (timeline) => {
  if (!timeline.lines || timeline.lines.length === 0 ) {
    throw { code: 400, msg: 'Timeline lines are required' }
  }
}

const createLinesFrom = async (lines, log) => {
  const logLines = await Line.find({_id: {$in: lines}, log})
  return await TimelineLine.insertMany(logLines.map(line => ({
    ...line,
    line,
    tags: []
  })
  ))
}

const create = new RequestWrapper(
  check('title', 'Timeline title is required').not().isEmpty(),
  check('lines', 'Timeline lines are required').not().isEmpty(),
  check('log', 'Log must a mongo id').isMongoId(),
)
  .hasId('projectId')
  .setHandler(async (req, resp) => {
    const timeline2Create = req.body
    validateTimeline(timeline2Create)
    // TODO
    const log = await Log.findOne({_id: timeline2Create.log, projectId: getIntValue(req.params.projectId)})
    if (!log) {
      throw { code: 404, msg: 'Log not found' }
    }
    const lines = await createLinesFrom(timeline2Create.lines, log)
    const timeline = new Timeline({
      title: timeline2Create.title,
      description: timeline2Create.description,
      log: log,
      projectId: getIntValue(req.params.projectId),
      lines
    })
    resp.status(200).json(timeline)
  }).wrap()

module.exports = {
  create
}