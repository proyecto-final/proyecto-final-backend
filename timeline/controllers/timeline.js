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
  if(logLines.length === 0){
    throw {code: 400, msg: 'Lines are not valid'}
  }
  const timelineLines = logLines.map(line => {
    const {raw, detail, vulnerabilites,timestamp, log, notes } = line
    return new TimelineLine({
      line,
      raw, 
      timestamp,
      detail, 
      vulnerabilites, 
      log, 
      notes,
      tags: []
    })})
  await Promise.all(timelineLines.map(async line => await line.validate()))
  return await TimelineLine.insertMany(timelineLines)
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
    await timeline.save()
    resp.status(200).json(timeline)
  }).wrap()


const destroy = new RequestWrapper(
  check('timelineId', 'Timeline must a mongo id').isMongoId()
)
  .hasId('projectId').setHandler(async (req, resp) => {
    const {timelineId, projectId } = req.params
    console.log('timeline: ',timelineId)
    console.log('project: ',projectId)
    const timeline = await Timeline.findOne({_id: timelineId, projectId: getIntValue(projectId)})
    if (!timeline) {
      throw { code: 404, msg: 'Timeline not found' }
    }
    const linesDeleted = await TimelineLine.deleteMany( {_id: timeline.lines.map(({_id}) => _id)})
    console.log(linesDeleted)
    await Timeline.deleteOne({_id: timelineId, projectId: getIntValue(projectId)})
    resp.status(200).json({ msg: `Timeline deleted with ${linesDeleted.deletedCount} lines` })
  }).wrap()

module.exports = {
  create,
  destroy
}