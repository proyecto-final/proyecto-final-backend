const RequestWrapper = require('./../../shared/utils/requestWrapper')
const { getIntValue, getBooleanValue } = require('./../../shared/utils/dataHelpers')
const mongoose = require('mongoose')
const Log = require('./../../shared/models/log')(mongoose)
const Line = require('./../../shared/models/line')(mongoose)
const Vulnerability = require('./../../shared/models/vulnerability')(mongoose)
const {adaptMongoosePage} = require('./../../shared/utils/pagination')
const line = require('./../../shared/models/line')

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
    
    const isSelectedValue = getBooleanValue(query.isSelected)
    if(isSelectedValue !== null){
      mongooseQuery.isSelected = isSelectedValue
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

const update = new RequestWrapper().hasId('projectId')
  .hasMongoId('lineId')
  .hasMongoId('logId')
  .setHandler(async (req, resp) => {
    const { lineId, projectId, logId } = req.params
    const { notes, vulnerabilites,isSelected } = req.body
    const lineUpdated = await Line.findOne({ _id: lineId, logId,projectId: getIntValue(projectId) })
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

module.exports = {
  get,
  update
}