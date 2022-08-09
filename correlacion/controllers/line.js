const RequestWrapper = require('./../../shared/utils/requestWrapper')
const { getIntValue, getDateValue } = require('./../../shared/utils/dataHelpers')
const mongoose = require('mongoose')
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
      const dateToEndDay = new Date(dateTo.getTime() + 24 * 60 * 60 * 1000)
      mongooseQuery.timestamp = mongooseQuery.timestamp ?
        { ...mongooseQuery.date, $lte: dateToEndDay } : { $lte: dateToEndDay }
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

const update = new RequestWrapper().hasId('projectId')
  .hasMongoId('lineId')
  .hasMongoId('logId')
  .setHandler(async (req, resp) => {
    const { lineId, projectId, logId } = req.params
    const { notes } = req.body
    const logOwner = await Log.findOne({ _id: logId, projectId: getIntValue(req.params.projectId) })
    if (!logOwner) {
      throw { code: 404, msg: 'Log not found' }
    }
    const lineUpdated = await Line.findOne({ _id: lineId, log: logOwner._id, projectId: getIntValue(projectId) })
    if (!lineUpdated) {
      throw {code: 404, msg: 'Line not found'}
    }
    if (notes){
      lineUpdated.notes = notes
    }
    await lineUpdated.save()
    resp.status(200).json(lineUpdated)
  }).wrap()

module.exports = {
  get,
  update
}