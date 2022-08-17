
const mongoose = require('mongoose')
const Log = require('../../shared/models/log')(mongoose)
const Line = require('../../shared/models/line')(mongoose)

const writeTitle = (title, doc) => doc.font('Helvetica').fontSize(20).text(title, {align: 'center'})
const addSpace = (number, doc) => doc.text('\n'.repeat(number), {align: 'center'})
const writeBody = (body, doc) => doc.font('Helvetica').fontSize(14).text(body, {align: 'justify'})
const writeSubTitle = (subTitle, doc) => doc.font('Helvetica').fontSize(18).text(subTitle, {align: 'justify'})
const writeBoldBody = (body, doc) => doc.font('Helvetica-Bold').fontSize(14).text(body, {align: 'justify'})

const writeLogIntoPDF = (log, doc) => {
  const {projectId, title, description, state, extension, createdAt, updatedAt} = log
  writeBody(`log: ${title}`, doc)
  addSpace(1, doc)
  writeBody(`log description: ${description}`, doc)
  addSpace(1, doc)
  writeBody(`log extension: ${extension}`, doc)
  addSpace(1, doc)
  writeBody(`state: ${state}`, doc)
  addSpace(1, doc)
  writeBody(`Project id: ${projectId}`, doc)
  addSpace(1, doc)
  writeBody(`creation time: ${createdAt}`, doc)
  addSpace(1, doc)
  writeBody(`last update: ${updatedAt}`, doc)
  addSpace(3, doc)
}
const writeLogLineIntoPDF = (line, doc) => {
  const {index, timestamp, raw, notes, vulnerabilites, detail} = line
  writeBoldBody( `${index} - ${timestamp}`,doc)
  addSpace(1, doc)
  writeBody(`line:${raw}`, doc)
  addSpace(1, doc)
  writeBody(`Notes: ${notes.join(',')}`, doc)
  addSpace(1, doc)
  writeBody(`Vulnerabilities found: ${vulnerabilites.map(vulnerability => vulnerability.name).join(',')}`, doc)
  addSpace(1, doc)
  writeBody(`Details:${Object.values(detail).join(',')}`, doc)
  addSpace(2, doc)
}

const createPDFStringContent = async({title, description, lines}, logData, logLines, doc) => {
  
  writeTitle(title, doc)
  writeBody(description, doc)
  addSpace(2, doc)
  writeSubTitle('Events',doc)
  lines.forEach(line => {
    writeBoldBody(line.timestamp, doc)
    writeBody(`${line.raw}`, doc)
    addSpace(1, doc)
    writeBody(`tags:${line.tags}`, doc)
    addSpace(2, doc)
  })
  addSpace(2, doc)
  writeSubTitle('Log Metadata',doc)
  writeLogIntoPDF(logData, doc)
  writeSubTitle('Log Lines', doc)
  logLines.forEach(line => writeLogLineIntoPDF(line, doc))
}

module.exports = {createPDFStringContent}