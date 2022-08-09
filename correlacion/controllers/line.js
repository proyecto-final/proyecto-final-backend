const RequestWrapper = require('./../../shared/utils/requestWrapper')
const { getIntValue, getDateValue } = require('./../../shared/utils/dataHelpers')
const mongoose = require('mongoose')
const {check} = require('express-validator')
const Log = require('./../../shared/models/log')(mongoose)
const Line = require('./../../shared/models/line')(mongoose)
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
    if (query.raw) {
      mongooseQuery.raw = { '$regex': query.raw, '$options': 'i' }
    }
    if (dateFrom) {
      mongooseQuery.timestamp = { $gte: dateFrom }
    }
    if (dateTo) {
      mongooseQuery.timestamp = mongooseQuery.timestamp ?
        { ...mongooseQuery.date, $lte: dateTo } : { $lte: dateTo }
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

const update = new RequestWrapper(
  check('annotations').isArray()
).hasId('projectId')
  .hasMongoId('lineId')
  .hasMongoId('logId')
  .setHandler(async (req, resp) => {
    const { lineId, projectId, logId } = req.params
    const { annotations } = req.body
    const lineUpdated = await Line.findOne({ _id: lineId, logId,projectId: getIntValue(projectId) })
    if (!lineUpdated) {
      throw {msg: 'Line not found'}
    }
    lineUpdated.notes = annotations
    await lineUpdated.save()
    resp.status(200).json(lineUpdated)
  }).wrap()

module.exports = {
  get,
  update
}