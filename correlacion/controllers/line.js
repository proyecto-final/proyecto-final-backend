const RequestWrapper = require('./../../shared/utils/requestWrapper')
const { getIntValue, getDateValue, getBooleanValue } = require('./../../shared/utils/dataHelpers')
const mongoose = require('mongoose')
const Log = require('./../../shared/models/log')(mongoose)
const Line = require('./../../shared/models/line')(mongoose)
const Vulnerability = require('./../../shared/models/vulnerability')(mongoose)
const {adaptMongoosePage} = require('./../../shared/utils/pagination')

const get = new RequestWrapper()
  .hasId('projectId')
  .hasMongoId('logId')
  .handlePagination()
  .setHandler(async (req, resp) => {
    const { query } = req
    const offset = getIntValue(query.offset)
    const limit = getIntValue(query.limit)
    const dateFrom = getDateValue(query.dateFrom)
    const dateTo = getDateValue(query.dateTo)
    const logOwner = await Log.findOne({ _id: req.params.logId, projectId: getIntValue(req.params.projectId) })
    if (!logOwner) {
      throw { code: 404, msg: 'Log not found' }
    }
    const mongooseQuery = {
      log: logOwner._id
    }
    const isSelectedValue = getBooleanValue(query.isSelected)
    if(isSelectedValue !== null){
      mongooseQuery.isSelected = isSelectedValue
    }

    if (query.raw) {
      mongooseQuery.raw = { '$regex': query.raw, '$options': 'i' }
    }
    if (dateFrom) {
      mongooseQuery.timestamp = { $gte: dateFrom }
    }
    if (dateTo) {
      const dateToEndDay = new Date(dateTo.getTime() + 24 * 60 * 60 * 1000)
      mongooseQuery.timestamp = mongooseQuery.timestamp ?
        { ...mongooseQuery.timestamp, $lte: dateToEndDay } : { $lte: dateToEndDay }
    }
    const lines = await Line.aggregate([
      {
        '$lookup': {
          'from': 'vulnerabilities',
          'localField': 'vulnerabilites',
          'foreignField': '_id',
          'as': 'vulnerabilites'
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
    resp.status(200).json(adaptMongoosePage(lines))
  }).wrap()

const update = new RequestWrapper()
  .hasId('projectId')
  .hasMongoId('lineId')
  .hasMongoId('logId')
  .setHandler(async (req, resp) => {
    const { lineId, projectId, logId } = req.params
    const { notes, vulnerabilites,isSelected } = req.body
    const logOwner = await Log.findOne({ _id: logId, projectId: getIntValue(projectId) })
    if (!logOwner) {
      throw { code: 404, msg: 'Log not found' }
    }
    const lineUpdated = await Line.findOne({ _id: lineId, log: logId,projectId: getIntValue(projectId) }).populate('vulnerabilites')
    if (!lineUpdated) {
      throw {code: 404, msg: 'Line not found'}
    }
    if (notes){
      lineUpdated.notes = notes
    }
    if (vulnerabilites) {
      const vulnerabilitesIds = vulnerabilites.map(vulnerability => vulnerability._id)
      const vulnerabilitesToAdd = await Vulnerability.find({ 
        _id: { $in: vulnerabilitesIds },
        $or: [
          {projectId: {$eq: getIntValue(projectId)}}, 
          {isCustom: false} 
        ]
      })
      lineUpdated.vulnerabilites = vulnerabilitesToAdd
    }
    const isSelectedValue = getBooleanValue(isSelected)
    if(isSelectedValue !== null){
      lineUpdated.isSelected = isSelectedValue
    }
    if(notes){
      lineUpdated.notes = notes
    }
    await lineUpdated.save()
    resp.status(200).json(lineUpdated)
  }).wrap()

const markAsSelected  = new RequestWrapper()
  .hasId('projectId')
  .hasMongoId('logId')
  .setHandler(async (req, resp) => {
    const { projectId, logId } = req.params
    const { lineIds } = req.body
    const logOwner = await Log.findOne({ _id: logId, projectId: getIntValue(projectId) })
    if (!logOwner) {
      throw { code: 404, msg: 'Log not found' }
    }
    if (!lineIds) {
      throw { code: 400, msg: 'LineIds not found' }
    }
    await Line.updateMany({ log:logId }, { isSelected: false })
    await Line.updateMany({ _id: { $in: lineIds }, log:logId }, { isSelected: true })
    resp.status(200).json({ msg: 'Ok' })
  }).wrap()

module.exports = {
  get,
  update,
  markAsSelected
}