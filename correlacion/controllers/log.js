const RequestWrapper = require('./../../shared/utils/requestWrapper')
const { getIntValue } = require('./../../shared/utils/dataHelpers')
const mongoose = require('mongoose')
const Log = require('./../../shared/models/log')(mongoose)
const Line = require('./../../shared/models/line')(mongoose)
const Vulnerability = require('./../../shared/models/vulnerability')(mongoose)
const {adaptMongoosePage} = require('./../../shared/utils/pagination')
const  {processFiles: processFilesWithChainsaw} = require('../chainsaw/chainsawAdapter.js')
const { get: getAttribute } = require('lodash')

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

const getExtension = (file) => {
  return file.name.split('.').pop()
}

const persistEvtxLinesFrom = async (processedLogs) => {
  const evtxLogLines = []
  for(const processedLog of processedLogs) {
    const { convertedFile, log, detections } = processedLog
    const converSingleLineJsonToValidOne = json => json.split('\n').join(',').slice(0, -1)
    const existingVulnerabilities = await Vulnerability.find({name: {$in: detections.map(detection => detection.name)}})
    const detections2Create = detections.filter(detection => !existingVulnerabilities.some(foundDetection => foundDetection.name === detection.name))
    const uniqueCreatedVulnerabilities = detections2Create
      .filter((detection, index) => detections2Create.findIndex(detection2 => detection2.name === detection.name) === index)
      .map(detection => new Vulnerability({
        name: detection.name,
        references: detection.references,
        level: detection.level,
        isCustom: false
      }))
    await Vulnerability.insertMany(uniqueCreatedVulnerabilities)
    const vulnerabilities = [...existingVulnerabilities, ...uniqueCreatedVulnerabilities]
    const vulnerabilitesWithDetection = detections.map(detectionData => ({
      vulnerability: vulnerabilities.find(foundDetection => foundDetection.name === detectionData.name),
      detectionData
    }))
    const defaultLines  = JSON.parse(`[${converSingleLineJsonToValidOne(convertedFile.data.toString())}]`)
    const lines2Save = defaultLines.map(defaultLine => {
      const timestamp = getAttribute(defaultLine, 'Event.System.TimeCreated.#attributes.SystemTime')
      const {EventID} = getAttribute(defaultLine, 'Event.System') || {}
      const vulnerabilites = vulnerabilitesWithDetection
        .filter(({detectionData}) => detectionData.identification.timestamp2 === timestamp && 
          detectionData.identification.eventId === EventID)
        .map(({vulnerability}) => vulnerability)
      return createLine(defaultLine, vulnerabilites, timestamp, log)
    })
    evtxLogLines.push(lines2Save)
  }
  return await Line.insertMany(evtxLogLines.flat())
}

const timestampRegex = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4} [0-2][0-9]:[0-5][0-9]:[0-5][0-9]:[0-9][0-9][0-9]/g

const persistCommonLogLinesFrom = async (logs) => {
  const logLines = logs.map(({ file, log }) => {
    const defaultLines  = file.data.toString().split('\n')
    const lines2Save = defaultLines.filter(line => !!line).map(defaultLine => {
      const dateString = defaultLine.match(timestampRegex)
      console.log('time: ', defaultLine)
      const timestamp = new Date(dateString[0])
      const otherAttributes = {
        warning: 'Line from .log file, not processed by chainsaw',
      }
      return new Line({
        log,
        timestamp,
        raw: defaultLine,
        detail: otherAttributes
      })
    })
    return lines2Save
  })
  return await Line.insertMany(logLines.flat())
}

const createLine = (defaultLine, vulnerabilites, timestamp, log) => {
  const {EventID, Channel, Computer, RemoteUserID} = getAttribute(defaultLine, 'Event.System') || {}
  const {DestAddress, DestPort, SourceAddress, SourcePort, Application, ProcessID} = 
        getAttribute(defaultLine, 'Event.EventData') || {}
  let ipData = ''
  if (SourceAddress) {
    ipData += ` - From: ${SourceAddress}:${SourcePort}`
  }
  if (DestAddress) {
    ipData += ` - To: ${DestAddress}:${DestPort}`
  }
  let applicationString = ''
  if (Application) {
    applicationString = ` - ${Application}`
  }
  const rawLine = `${timestamp} - ${EventID} - ${Channel}${ipData}${applicationString}`
  const otherAttributes = {
    application: Application,
    applicationId: ProcessID,
    computer: Computer,
    userId: RemoteUserID
  }
  return new Line({
    log,
    timestamp,
    vulnerabilites,
    raw: rawLine,
    detail: otherAttributes
  })
}

const processAndPersistLogs = async (logs, files, convertedFiles) => {
  const logsWithFiles = logs.map((log, index) => ({
    log,
    file: files[index]
  }))
  // Get different types
  // const nonEvtxLogs = logsWithFiles
  //   .filter(({ file }) => getExtension(file) !== 'evtx')
  const evtxLogs = logsWithFiles
    .filter(({ file }) => getExtension(file) === 'evtx')

  const nonEvtxLogs = logsWithFiles.filter(({ file }) => getExtension(file) === 'log')

  // Process and merge results
  const processedLogs = (await processFilesWithChainsaw(evtxLogs))
    .map((processedLog, index) => ({...processedLog, convertedFile: convertedFiles[index]}))
  try {
    await persistEvtxLinesFrom(processedLogs)
    await persistCommonLogLinesFrom(nonEvtxLogs)
    
  } catch (err) {
    console.error(err)
    throw { code: 500, msg: 'Couldn\'t process log files' }
  }
  await Promise.all(logs.map(log => {
    log.state = 'processed'
    return log.save()
  }))
  // const logs2Persist = [...nonEvtxLogs, ...processedLogs]
  // persist lines of evtxLogWithFiles+processedLogs and nonEvtxLogWithFiles
  return logsWithFiles
}
const create = new RequestWrapper()
  .hasId('projectId')
  .setHandler(async (req, resp) => {
    const fileOrFiles = req.files?.files
    const jsonFileOrFiles = req.files?.convertedFiles
    const { files, metadatas, convertedFiles } = checkLogs(fileOrFiles, req.body.metadata, jsonFileOrFiles)
    const logsWithMetadata = files.map((file, index) => 
      ({
        ...metadatas[index],
        projectId: getIntValue(req.params.projectId),
        extension: getExtension(file),
        file
      }))
    // HEADER
    const logs = logsWithMetadata.map(logMetadata => new Log({...logMetadata, projectId: getIntValue(req.params.projectId)}))
    await Promise.all(logs.map(async log => await log.validate()))
    await Promise.all(logs.map(async log => await log.save()))
    // BODY
    await processAndPersistLogs(logs, files, convertedFiles)

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