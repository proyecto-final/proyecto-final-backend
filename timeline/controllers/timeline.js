const RequestWrapper = require('../../shared/utils/requestWrapper')
const { getIntValue } = require('../../shared/utils/dataHelpers')
const { check} = require('express-validator')
const mongoose = require('mongoose')
const Timeline = require('../../shared/models/timeline')(mongoose)
const Log = require('../../shared/models/log')(mongoose)
const Line = require('../../shared/models/line')(mongoose)
const {adaptMongoosePage} = require('./../../shared/utils/pagination')
const PDFDocument = require('pdfkit')
const {createPDFStringContent} = require('../../utils/pdf')

const getReport = new RequestWrapper()
  .hasMongoId('timelineId')
  .hasMongoId('logId')
  .hasId('projectId')
  .setHandler(async (req, res) => {
    const { timelineId, logId } = req.params
    const timeline = await Timeline.findOne({id: timelineId, log: logId})
    const logData = await Log.findOne({id: logId})
    const logLines = await Line.find({logId})
    if(!logData){
      throw {code: 404, msg: 'Log not found'}
    }
    if(!logLines){
      throw {code: 404, msg: 'Lines not found'}
    }
    if(!timeline){
      throw {code: 404, msg: 'Timeline not found'}
    }
    const doc = new PDFDocument({size:'A4', margin: 50})
    const fileName = `report_${timelineId}.pdf`
    res.setHeader('Content-disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-type', 'application/pdf')
    await createPDFStringContent(timelineId, logData, logLines, doc)
    doc.pipe(res)
    doc.end()
    return res.status(200)
  }).wrap()

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
    const requestLines = body.lines
    if (!timeline) {
      throw { code: 404, msg: 'Timeline not found' }
    }
    if (body.title) {
      timeline.title = body.title
    }
    if(requestLines){
      const linesIds = requestLines.map(line => line.id)
      const linesCreated = await createLinesFrom(linesIds, timeline.log)
      const findTagsInRequestById = id => requestLines.find(lineFromRequest => lineFromRequest.id === id)?.tags
      linesCreated.forEach(lineWithLogLineData => lineWithLogLineData.tags = findTagsInRequestById(lineWithLogLineData.line._id.toString()))
      timeline.lines = linesCreated
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
      const timelines = await Timeline.aggregate([
        {
          '$lookup': {
            'from': 'vulnerabilities',
            'localField': 'lines.vulnerabilites',
            'foreignField': '_id',
            'as': 'linesVulnerabilites'
          }
        },
        {
          $match: {
            _id: mongoose.Types.ObjectId(timelineId),
            projectId: getIntValue(projectId)
          }
        }
      ])
      if (!timelines || timelines.length === 0) {
        throw { code: 404, msg: 'Timeline not found' }
      }
      const getVulnerabilitesForLine = (timeline, line) => timeline.linesVulnerabilites
        .filter(vulnerability => line.vulnerabilites.map(id => id.toString()).includes(vulnerability._id.toString()))
      resp.status(200).json(timelines.map(timeline => ({
        ...timeline,
        lines: timeline.lines.map(line => ({
          ...line,
          vulnerabilites: getVulnerabilitesForLine(timeline, line)
        })
        )}))[0])
    }
  ).wrap()

module.exports = {
  create,
  destroy,
  update,
  get,
  getSpecific,
  getReport
}