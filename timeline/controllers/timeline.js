const RequestWrapper = require('../../shared/utils/requestWrapper')
const { getIntValue } = require('../../shared/utils/dataHelpers')
const { check} = require('express-validator')
const mongoose = require('mongoose')
const Timeline = require('../../shared/models/timeline')(mongoose)
const Log = require('../../shared/models/log')(mongoose)
const Line = require('../../shared/models/line')(mongoose)
const {adaptMongoosePage} = require('./../../shared/utils/pagination')

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
    return {
      line,
      raw, 
      timestamp,
      detail, 
      vulnerabilites, 
      log, 
      notes,
      tags: []
    }})
  return timelineLines
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
    const linesIds = timeline2Create.lines.map(line => line.id)
    const lines = await createLinesFrom(linesIds, log)
    lines.forEach(lineWithLogLineData => lineWithLogLineData.tags = timeline2Create.lines.find(lineFromRequest => lineFromRequest.id === lineWithLogLineData.line._id.toString())?.tags)
    
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


const destroy = new RequestWrapper()
  .hasMongoId('timelineId')
  .hasId('projectId').setHandler(async (req, resp) => {
    const {timelineId, projectId } = req.params
    const timeline = await Timeline.findOne({_id: timelineId, projectId: getIntValue(projectId)})
    if (!timeline) {
      throw { code: 404, msg: 'Timeline not found' }
    }
    const linesDeleted = timeline.lines.length
    await Timeline.deleteOne({_id: timelineId, projectId: getIntValue(projectId)})
    resp.status(200).json({ msg: `Timeline deleted with ${linesDeleted} lines` })
  }).wrap()

const update = new RequestWrapper()
  .hasId('projectId')
  .hasMongoId('timelineId')
  .setHandler(async (req, resp) => {
    const { body } = req
    const timeline = await Timeline.findOne({_id: req.params.timelineId, projectId: getIntValue(req.params.projectId)})
    if (!timeline) {
      throw { code: 404, msg: 'Log not found' }
    }
    if (body.title) {
      timeline.title = body.title
    }
    if(body.lines){
      const linesIds = body.lines.map(line => line.id)
      console.log('ids: ',linesIds)
      timeline.lines = await createLinesFrom(linesIds, timeline.log)
      timeline.lines.forEach(lineWithLogLineData => lineWithLogLineData.tags = body.lines.find(lineFromRequest => lineFromRequest.id === lineWithLogLineData.line._id.toString())?.tags)
    }
    if (body.description !== undefined) {
      timeline.description = body.description
    }
    await timeline.save()
    resp.status(200).json(timeline)
  }).wrap()

const get = new RequestWrapper()
  .hasId('projectId')
  .handlePagination()
  .setHandler(async (req, resp) => {
    const { query } = req
    const offset = getIntValue(query.offset)
    const limit = getIntValue(query.limit)
    const mongooseQuery = {
      'projectId': getIntValue(req.params.projectId)
    }
    if (query.title) {
      mongooseQuery.title = { '$regex': query.title, '$options': 'i' }
    }
    const timelines = await Timeline.aggregate([
      {
        $project: {
          lines: 0
        }
      },
      {
        $facet: {
          paginatedResult: [
            { $match: mongooseQuery },
            { $skip: offset },
            { $limit: limit }
          ],
          totalCount: [
            { $match: mongooseQuery },
            { $count: 'totalCount' }
          ]
        }
      }])
    resp.status(200).json(adaptMongoosePage(timelines))
  }).wrap()

const getSpecific = new RequestWrapper()
  .hasId('projectId')
  .hasMongoId('timelineId')
  .setHandler(
    async (req, resp) => {
      const { timelineId, projectId } = req.params
      const timeline = await Timeline.findOne({_id: timelineId, projectId: getIntValue(projectId)})
      if (!timeline) {
        throw { code: 404, msg: 'Timeline not found' }
      }
      resp.status(200).json(timeline)
    }
  ).wrap()

module.exports = {
  create,
  destroy,
  update,
  get,
  getSpecific
}