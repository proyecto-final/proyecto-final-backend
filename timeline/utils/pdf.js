require('../../shared/models/vulnerability')
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

const writeIpIntoPDF = (ip, doc) => {
  const {projectId, raw, reputation, country, city, isTor, totalReports, VPN, ISP, lastReportedAt, ports, reports} = ip
  writeBoldBody(`Ip report (${raw})`, doc)
  writeBody(`- Reputation: ${reputation}`, doc)
  writeBody(`- Is tor node: ${isTor}`, doc)
  writeBody(`- Country: ${country || 'no country found'}`, doc)
  writeBody(`- City: ${city || 'no city found'}`, doc)
  writeBody(`- Project id: ${projectId}`, doc)
  writeBody(`- ISP: ${ISP}`, doc)
  writeBody(`- Uses VPN: ${VPN}`, doc)
  writeBody(`- Total reports: ${totalReports}`, doc)
  writeBody(`- Last reported: ${lastReportedAt}`, doc)
  if(ports.length > 0){
    writeBody(`- Ports: ${ports.join(',')}`, doc)
  }
  if(reports.length > 0){
    writeBoldBody(`Reports (${raw})`, doc)
    writeBody(`- ${reports.map(({comment, reportedAt, categories, reporterCountryName}) => `${comment}. ${reportedAt}. Categories: ${categories.join(',')}. From: ${reporterCountryName}`).join('\n - ')}`, doc)
  }
}

const getVulnerabilitesNames = (vulnerabilites) => vulnerabilites.length === 0 ? 'No vulnerabilities detected' : vulnerabilites.map(vulnerability => vulnerability.name).join(',')

const createPDFStringContent = async(timeline, logs, doc) => {
  const {title, description, lines} = timeline
  writeTitle(title, doc)
  writeBody(description, doc)
  addSpace(2, doc)
  writeSubTitle('Events',doc)
  lines.forEach(({timestamp, raw, vulnerabilites, tags, ips}) => {
    writeBoldBody(timestamp, doc)
    writeBody(`${raw}`, doc)
    if (tags.length > 0) {
      writeBody(`Tags: ${tags.join(',')}.`, doc)
    }
    if (!!ips && ips.length > 0) {
      ips.forEach(ip => writeIpIntoPDF(ip, doc))
    }
    writeBody(`Event Vulnerabilites: ${getVulnerabilitesNames(vulnerabilites)}.`, doc)
    addSpace(1, doc)
  })
  addSpace(2, doc)
  if (logs.length > 0) {
    writeSubTitle('Logs Metadata',doc)
    logs.forEach(log => writeLogIntoPDF(log, doc))
  }
}

module.exports = {createPDFStringContent}