const vulnerability = require('../../shared/models/vulnerability')

const writeTitle = (title, doc) => doc.font('Helvetica').fontSize(20).text(title, {align: 'center'})
const addSpace = (number, doc) => doc.text('\n'.repeat(number), {align: 'center'})
const writeBody = (body, doc) => doc.font('Helvetica').fontSize(14).text(body, {align: 'justify'})
const writeSubTitle = (subTitle, doc) => doc.font('Helvetica').fontSize(18).text(subTitle, {align: 'justify'})
const writeBoldBody = (body, doc) => doc.font('Helvetica-Bold').fontSize(14).text(body, {align: 'justify'})

const writeLogIntoPDF = (log, doc) => {
  const {projectId, title, description, state, extension, createdAt, updatedAt} = log
  writeBoldBody(`log: ${title}`, doc)
  writeBody(`log description: ${description || 'no description available'}`, doc)
  writeBody(`log extension: ${extension}`, doc)
  writeBody(`state: ${state}`, doc)
  writeBody(`Project id: ${projectId}`, doc)
  writeBody(`creation time: ${createdAt}`, doc)
  writeBody(`last update: ${updatedAt}`, doc)
}
const writeLogLineIntoPDF = (line, doc) => {
  const {index, timestamp, raw, notes, vulnerabilites,ips, detail} = line
  writeBoldBody(`${index} - ${timestamp}`, doc)
  writeBody(`Line: ${raw}`, doc)
  writeBody(`Notes: ${(notes.length === 0 ? ['No notes']: notes).join(',')}`, doc)
  writeBody(`Vulnerabilities found: ${getVulnerabilitesNames(vulnerabilites)}`, doc)
  writeBody(`Ips found: ${getIps(ips)}`, doc)
  writeBody(`Details: ${Object.values(detail).join(',')}`, doc)
  addSpace(1, doc)
}

const getVulnerabilitesNames = (vulnerabilites) => vulnerabilites.length === 0 ? 'No vulnerabilities detected' : vulnerabilites.map(vulnerability => vulnerability.name).join(',')

const getIps = (existingIps) =>  existingIps.length === 0 ? 'No IPs scanned' : existingIps.map(ip => ip.raw).join(',')

const createPDFStringContent = async(timeline, logs, logLines, doc) => {
  const {title, description, lines} = timeline
  writeTitle(title, doc)
  writeBody(description, doc)
  addSpace(2, doc)
  writeSubTitle('Events',doc)
  lines.forEach(({timestamp, raw, vulnerabilites, tags}) => {
    writeBoldBody(timestamp, doc)
    writeBody(`${raw}`, doc)
    if (tags.length > 0) {
      writeBody(`Tags: ${tags.join(',')}.`, doc)
    }
    writeBody(`Event Vulnerabilites: ${getVulnerabilitesNames(vulnerabilites)}.`, doc)
    addSpace(1, doc)
  })
  addSpace(2, doc)
  writeSubTitle('Log Metadata',doc)
  logs.forEach(log => writeLogIntoPDF(log, doc))
  addSpace(2, doc)
  writeSubTitle('Log Lines', doc)
  logLines.forEach(line => writeLogLineIntoPDF(line, doc))
}

module.exports = {createPDFStringContent}