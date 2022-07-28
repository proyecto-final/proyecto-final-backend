
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

async function processLog (log) {
  // 1 Write
  console.log(log)
  const temporaryName = `${log.log._id.toString()}-${log.file.name}`
  await log.file.mv(`${__dirname}/input/${temporaryName}`, function(err) {
    if (err) {
      throw { code: 500, msg: 'Error moving file'+err }
    }
  })
  // 2 Process
  const chainsawCommand = `${__dirname}/chainsaw hunt ${__dirname}/input/${temporaryName} -s ${__dirname}/sigma/ --mapping ${__dirname}/mappings/sigma-event-logs-all.yml  -o ${__dirname}/output/${temporaryName}.json --json`
  console.log(chainsawCommand)
  try {
    await runCommand(chainsawCommand)
  }catch (err) {
    console.log(err)
    throw { code: 500, msg: 'Error running chainsaw'+err }
  }
  // 3 Read output
  const outputFile = `${__dirname}/output/${temporaryName}.json`
  const output = JSON.parse(fs.readFileSync(outputFile))
  console.log(output)
  // 4 Delete chainsaw file output as well as input
  fs.unlinkSync(outputFile)
  fs.unlinkSync(`${__dirname}/input/${temporaryName}`)
}
module.exports = {
  processFiles: async function(logs) {
    const result = []
    for (const log of logs) {
      result.push(await processLog(log))
      console.log('processed')
    }
    return result
  }
}

