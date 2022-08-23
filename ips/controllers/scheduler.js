const cron = require('node-cron')
const torList = require('./torList')

cron.schedule(process.env.RUN_INTERVAL || '0 */15 * * * *', async () => {
    // Read files
    try{
        console.log('Refreshing Tor List')
        await torList.refreshTorInfo()
    } catch(err) {
        console.log(err)
    }
})