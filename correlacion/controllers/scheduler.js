const cron = require('node-cron')
const fs = require('fs')
const { getDateValue } = require('./../../shared/utils/dataHelpers')
const mongoose = require('mongoose')
const Log = require('./../../shared/models/log')(mongoose)
const Line = require('./../../shared/models/line')(mongoose)
const Vulnerability = require('./../../shared/models/vulnerability')(mongoose)
const {processFiles: processFilesWithChainsaw} = require('../chainsaw/chainsawAdapter.js')
const { get: getAttribute, isEmpty } = require('lodash')

const persistCommonLogLinesFrom = async (logFile) => {
  const timestampRegex = /((0[1-9]|[1-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])(\/|-)[0-9]{4} ([0-2][0-9]:[0-5][0-9]:[0-5][0-9]:[0-9][0-9][0-9])|[0-2][0-9]:[0-5][0-9]:[0-5][0-9])|(([0-2][0-9]:[0-5][0-9]:[0-5][0-9]:[0-9][0-9][0-9]|[0-2][0-9]:[0-5][0-9]:[0-5][0-9]) (0[1-9]|[1-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])(\/|-)[0-9]{4})/g
  const { file, log } = logFile
  const defaultLines  = file.data.toString().split('\n')
  const lines2Save = defaultLines.filter(line => !!line).map((defaultLine, index) => {
    const dateString = defaultLine.match(timestampRegex)
    const timestamp = !isEmpty(dateString) ? getDateValue(dateString) : null
    const otherAttributes = {
      processing: 'Line from .log file, not processed by chainsaw',
      warnings: !timestamp  ? 'Time not found in line or is not valid.' : 'No warning provided.'
    }
    return new Line({
      log,
      timestamp,
      raw: defaultLine,
      detail: otherAttributes,
      index
    })
  })
  return await Line.insertMany(lines2Save)
}

const createLine = (defaultLine, vulnerabilites, timestamp, log, index) => {
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
    detail: otherAttributes,
    index
  })
}

const persistEvtxLinesFrom = async (processedLog) => {
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
  const defaultLines  = JSON.parse(`[${converSingleLineJsonToValidOne(convertedFile.toString())}]`)
  const lines2Save = defaultLines.map((defaultLine, index) => {
    const timestamp = getAttribute(defaultLine, 'Event.System.TimeCreated.#attributes.SystemTime')
    const {EventID} = getAttribute(defaultLine, 'Event.System') || {}
    const vulnerabilites = vulnerabilitesWithDetection
      .filter(({detectionData}) => detectionData.identification.timestamp2 === timestamp && 
          detectionData.identification.eventId === EventID)
      .map(({vulnerability}) => vulnerability)
    return createLine(defaultLine, vulnerabilites, timestamp, log, index)
  })
  return await Line.insertMany(lines2Save)
}


const processAndPersistLog = async (log, filename, convertedFile) => {
  try {
    if (filename.endsWith('.evtx')) {
      const processedLog = (await processFilesWithChainsaw([{log, filename}]))[0]
      await persistEvtxLinesFrom({...processedLog, convertedFile})
    } else if (filename.endsWith('.log')) {
      await persistCommonLogLinesFrom({filename, log})
    } else {
      console.log('INVALID FILE', filename)
    }
  } catch (err) {
    console.log(err)
    throw { code: 500, msg: 'Couldn\'t process log files' }
  }
  log.state = 'processed'
  await log.save()
}
// '0 */5 * * * *'
cron.schedule('*/15 * * * * *', async () => {
  console.log('running...')
  // Read files
  try{
    const inputDirectory = `${__dirname}/../chainsaw/input/`
    const filesnames2Process = fs.readdirSync(inputDirectory).filter(filename => filename.includes('-id-'))
    if (filesnames2Process.length === 0) {
      console.log('Nothing to process')
      return
    }
    for (const filename of filesnames2Process) {
      const filePath = `${inputDirectory}${filename}`
      if (filename.endsWith('.evtx')) {
        const convertedFile = fs.readFileSync(filePath + '-converted.json')
        const logId = filename.split('-id-')[0]
        const log = await Log.findById(logId)
        await processAndPersistLog(log, filename, convertedFile)
      } else if (!filename.endsWith('.json')) {
        // TODO
      } else{
        console.log('ignored', filename)
      }
    }
    
  } catch(err) {
    console.log(err)
  }
})