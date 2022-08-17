const RequestWrapper = require('./../../shared/utils/requestWrapper')
const { getIntValue, getExtension } = require('./../../shared/utils/dataHelpers')
const mongoose = require('mongoose')
const Log = require('./../../shared/models/log')(mongoose)
const {adaptMongoosePage} = require('./../../shared/utils/pagination')

const checkLogs = (fileOrFiles, metadata, convertedFileOrFiles) => {
  const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]
  const convertedFiles = Array.isArray(convertedFileOrFiles) ? convertedFileOrFiles : [convertedFileOrFiles]
  let metadatas
  try {
    metadatas = JSON.parse(metadata)
  } catch (err) {
    throw { code: 400, msg: 'Invalid metadata, must be a valid JSON' }
  }
  if (files.length !== metadatas.length) {
    throw { code: 400, msg: 'Number of files, metadata must be the same' }
  }
  const evtxFiles = files.filter(file => getExtension(file) === 'evtx')
  if (evtxFiles.length >= 1 && evtxFiles.length !== convertedFiles.length) {
    throw { code: 400, msg: 'Number of files, converted files must be the same' }
  }
  return { files, metadatas, convertedFiles }
}


const create = new RequestWrapper()
  .hasId('projectId')
  .setHandler(async (req, resp) => {
    const fileOrFiles = req.files?.files
    const jsonFileOrFiles = req.files?.convertedFiles
    const { files, metadatas, convertedFiles } = checkLogs(fileOrFiles, req.body.metadata, jsonFileOrFiles)
    // HEADER
    const logs = files.map((file, index) => new Log({
      ...metadatas[index],
      projectId: getIntValue(req.params.projectId),
      extension: getExtension(file),
    }))
    await Promise.all(logs.map(async log => await log.validate()))
    await Promise.all(logs.map(async log => await log.save()))
    // Move files to process
    const evtxFiles = files.filter(file => getExtension(file) === 'evtx')
    const files2Move = files.map((file, index)=> ({
      file,
      log: logs[index],
      convertedFile: convertedFiles[evtxFiles.indexOf(file)]
    }))
    const inputDirectory =`${__dirname}/../chainsaw/input/`
    await Promise.all([...files2Move.map(async ({file, log, convertedFile}) => {
      const temporaryName = `${log._id.toString()}-id-${file.name}`
      try {
        await file.mv(`${inputDirectory}${temporaryName}`)
        if (convertedFile) {
          const convertedFileTemporaryName = `${log._id.toString()}-id-${convertedFile.name}`
          await convertedFile.mv(`${inputDirectory}${convertedFileTemporaryName}`)
        }
      } catch (err) {
        throw { code: 500, msg: 'Error moving file' }
      }
    })])
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