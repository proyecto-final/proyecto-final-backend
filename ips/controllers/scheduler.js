const cron = require('node-cron')
const torList = require('./torList')

cron.schedule(process.env.RUN_INTERVAL || '0 */15 * * * *', async () => {
    try{
        console.log('Refreshing Tor List') //log to check if the cron is working
        await torList.refreshTorInfo()
    } catch(err) {
        console.log(err)
    }
})