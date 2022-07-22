const RequestWrapper = require('./../../shared/utils/requestWrapper')
const { getIntValue } = require('./../../shared/utils/dataHelpers')
const mongoose = require('mongoose')
const Log = require('./../../shared/models/log')(mongoose)
const {adaptMongoosePage} = require('./../../shared/utils/pagination')

const create = new RequestWrapper()
  .hasId('projectId')
  .setHandler(async (req, resp) => {
    const fileOrFiles = req.files?.files
    if(fileOrFiles?.length === 0 || !fileOrFiles) {
      throw { code: 400, msg: 'No files were uploaded.' }
    }
    const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]
    if (files.length > 5) {
      throw { code: 400, msg: 'Max 5 files are allowed.' }
    }
    let metadatas
    try {
      metadatas = JSON.parse(req.body.metadata)
    } catch (err) {
      throw { code: 400, msg: 'Invalid metadata, must be a valid JSON' }
    }
    if (files.length !== metadatas.length) {
      throw { code: 400, msg: 'Number of files and metadata must be the same' }
    }
    const logsWithMetadata = files.map((file, index) => ({extension :file.name.split('.').pop(), ...metadatas[index], projectId: getIntValue(req.params.projectId)}))
    const logs = logsWithMetadata.map(logMetadata => new Log({...logMetadata, projectId: getIntValue(req.params.projectId)}))
    await Promise.all(logs.map(async log => await log.validate()))
    await Log.collection.insertMany(logs)
    resp.status(200).json(logs)
  }).wrap()

const get = new RequestWrapper()
  .hasId('projectId')
  .handlePagination()
  .setHandler(async (req, resp) => {
    const { query } = req
    const offset = getIntValue(query.offset)
    const limit = getIntValue(query.limit)
    const mongooseQuery = {
      projectId: getIntValue(req.params.projectId)
    }
    if (query.title) {
      mongooseQuery.title = { '$regex': query.title, '$options': 'i' }
    }
    if (query.state) {
      mongooseQuery.state = query.state
    }
    const logs = await Log.aggregate([{
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
    resp.status(200).json(adaptMongoosePage(logs))
  }).wrap()

module.exports = { create, get }