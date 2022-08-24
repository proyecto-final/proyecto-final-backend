const cron = require('node-cron')
const mongoose = require('mongoose')
const TorList = require('../../shared/models/torList')(mongoose)
const axios = require('axios')

cron.schedule(process.env.RUN_INTERVAL || '0 */15 * * * *', async () => {
  try{
    console.log('Refreshing Tor List') //log to check if the cron is working 
    const {data} = await axios.get('https://check.torproject.org/torbulkexitlist')
    //clean collection
    await TorList.deleteMany({})
    const torList = data.split('\n').map(ip => ip.trim()).filter(ip => !!ip).map(ip => (new TorList({ip})))
    //re write collection
    await TorList.insertMany(torList)
    console.log(`Finished updating tor list with ${torList.length} ips`)
  } catch(err) {
    console.log('Error while updating tor ips', err)
  }
})
