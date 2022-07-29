
const { exec } = require('child_process')
const fs = require('fs')

const runCommand = (stringCommand) => {
  return new Promise((resolve, reject) => {
    const migrate = exec(
      stringCommand,
      { env: process.env },
      err => (err ? reject(err) : resolve())
    )
    migrate.stdout.pipe(process.stdout)
    migrate.stderr.pipe(process.stderr)
  })
}

function getChainsawPath () {
  const os = process.platform
  const osFolder = {
    'darwin': {
      chainsaw: `${__dirname}/exec/macos/chainsaw`,
      mapping: `${__dirname}/exec/macos/mappings/sigma-event-logs-all.yml`
    },
    'win32': {
      chainsaw: `${__dirname}/exec/macos/chainsaw.exe`,
      mapping: `${__dirname}/exec/macos/mappings/sigma-event-logs-all.yml`
    },
    'linux': {
      chainsaw: 'chainsaw', //for docker
      mapping: `${__dirname}/exec/unix/mappings/sigma-event-logs-all.yml`
    },
  }
  return osFolder[os] || osFolder.linux
}

async function processLog (log) {
  // 1 Write
  const temporaryName = `${log.log._id.toString()}-${log.file.name}`
  await log.file.mv(`${__dirname}/input/${temporaryName}`, function(err) {
    if (err) {
      throw { code: 500, msg: 'Error moving file'+err }
    }
  })
  // 2 Process
  const {chainsaw, mapping} = getChainsawPath()
  const chainsawCommand = `${chainsaw} hunt ${__dirname}/input/${temporaryName} -s ${__dirname}/sigma/ --mapping ${mapping}  -o ${__dirname}/output/${temporaryName}.json --json`
  console.log(chainsawCommand)
  try {
    await runCommand(chainsawCommand)
  }catch (err) {
    console.log(err)
    throw { code: 500, msg: 'Error running chainsaw'+err }
  } finally {
    fs.unlinkSync(`${__dirname}/input/${temporaryName}`)
  }
  // 3 Read output
  const outputFile = `${__dirname}/output/${temporaryName}.json`
  try {
    const detections = JSON.parse(fs.readFileSync(outputFile))
    const minifiedDetections = detections.map(detection => ({
      name: detection.name,
      identification: {
        timestamp: detection.timestamp,
        timestamp2: detection.document.data.Event.System.TimeCreated_attributes.SystemTime,
        eventId: detection.document.data.Event.System.EventID,
        processId: detection.document.data.Event.System.Execution_attributes.ProcessID,
      },
      references: detection.references
    }))
    return {
      ...log,
      detections: minifiedDetections
    }
  } catch (err) {
    console.log(err)
    throw { code: 500, msg: 'Error reading output'+err }
  } finally {
    // 4 Delete chainsaw file output
    fs.unlinkSync(outputFile)
  }
}
module.exports = {
  processFiles: async function(logs) {
    const result = []
    for (const log of logs) {
      result.push(await processLog(log))
    }
    return result
  }
}

