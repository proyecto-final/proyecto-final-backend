const RequestWrapper = require('./../../shared/utils/requestWrapper')
const { getIntValue } = require('./../../shared/utils/dataHelpers')
const mongoose = require('mongoose')
const Log = require('./../../shared/models/log')(mongoose)
const {adaptMongoosePage} = require('./../../shared/utils/pagination')
const  {processFiles}= require('../chainsaw/chainsawAdapter.js')

const checkLogs = (fileOrFiles, metadata) => {
  if(fileOrFiles?.length === 0 || !fileOrFiles) {
    throw { code: 400, msg: 'No files were uploaded.' }
  }
  const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]
  if (files.length > 5) {
    throw { code: 400, msg: 'Max 5 files are allowed.' }
  }
  let metadatas
  try {
    metadatas = JSON.parse(metadata)
  } catch (err) {
    throw { code: 400, msg: 'Invalid metadata, must be a valid JSON' }
  }
  if (files.length !== metadatas.length) {
    throw { code: 400, msg: 'Number of files and metadata must be the same' }
  }
  return { files, metadatas }
}
const create = new RequestWrapper()
  .hasId('projectId')
  .setHandler(async (req, resp) => {
    const fileOrFiles = req.files?.files
    const { files, metadatas } = checkLogs(fileOrFiles, req.body.metadata)
    const logsWithMetadata = files.map((file, index) => 
      ({
        ...metadatas[index],
        projectId: getIntValue(req.params.projectId),
        extension: file.name.split('.').pop(),
        file,
      }))
    // HEADER
    const logs = logsWithMetadata.map(logMetadata => new Log({...logMetadata, projectId: getIntValue(req.params.projectId)}))
    await Promise.all(logs.map(async log => await log.validate()))
    await Promise.all(logs.map(async log => await log.save()))
    // BODY
    const logsWithFiles = logs.map((log,index) => ({
      log,
      file: files[index]
    }))
    const processedLogs = await processFiles(logsWithFiles)
    console.log(processedLogs)

    resp.status(200).json(logs)
  }).wrap()

const destroy = new RequestWrapper().hasMongoId('logId').hasId('projectId')
  .setHandler(async(req, resp) => {
    const { logId, projectId } = req.params
    const deletedLog = await Log.deleteOne({_id: logId, projectId: getIntValue(projectId)})
    if (!deletedLog || deletedLog.deletedCount === 0){
      throw { code: 404, msg: 'Log not found' }
    }
    resp.status(200).json({ msg: 'OK' })
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

const update = new RequestWrapper()
  .hasId('projectId')
  .hasMongoId('logId')
  .setHandler(async (req, resp) => {
    const { body } = req
    const log = await Log.findOne({ _id: req.params.logId, projectId: getIntValue(req.params.projectId) })
    if (!log) {
      throw { code: 404, msg: 'Log not found' }
    }
    if (body.title) {
      log.title = body.title
    }
    if (body.description !== undefined) {
      log.description = body.description
    }
    await log.save()
    resp.status(200).json(log)
  }).wrap()


module.exports = { create, get, update, destroy }