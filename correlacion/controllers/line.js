const RequestWrapper = require('./../../shared/utils/requestWrapper')
const { getIntValue } = require('./../../shared/utils/dataHelpers')
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
    const lines = await Line.aggregate([{
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