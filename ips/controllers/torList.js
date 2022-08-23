
const mongoose = require('mongoose')
const TorList = require('../../shared/models/torList')(mongoose)
const axios = require('axios')
const RequestWrapper = require('../../shared/utils/requestWrapper')


const refreshTorInfo = async() => {
    const {data} = await axios.get('https://check.torproject.org/torbulkexitlist')
    const torNodes = data.split('\n').map(ip => ip.trim()).filter(ip => !!ip)
    const torList = await TorList.findOne()
    torList.list = torNodes
    await torList.save()
    return torList
}

const getTorNodeInfo = new RequestWrapper().setHandler(async (req, res) => {
    res.status(200).json(await refreshTorInfo())
}).wrap()

const isTorAdress = new RequestWrapper().setHandler(async (req, res) => {
    const {ip} = req.query
    const torList = await TorList.findOne()
    const isTor = torList.list.includes(ip)
    res.status(200).json({isTor})
}).wrap()


module.exports = {
    getTorNodeInfo,
    isTorAdress,
    refreshTorInfo
}