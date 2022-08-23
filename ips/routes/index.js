const {Router} = require('express')
const router = Router()
const Ip = require('../controllers/ips')
const TorList = require('../controllers/torList')
/*TODO: cuando se generen las acciones posta hay que migrarlas a un controller 
        y llamarlas desde aca con un require */
const logInput = async(req, resp) => {
    const {body, query, params} = req
    console.log('request recieved: ', req)
    console.log('body request recieved: ', body)
    console.log('query request recieved: ', query)
    console.log('params request recieved: ', params)
    resp.status(200).json({
        msg: 'Mocking Test',
        request: {
            body,
            query,
            params
        }
    })
}

const checkModule = (req, resp) => {
    return resp.status(200).json({
        msg: 'Timeline Module :)'
    })
}

//NOTA: cuando lo vayan a usar este projectId recuerden que viene adentro de req.params como {projectId: value}
router.post('/project/:projectId/ip-analysis/log/:logId',[], logInput)
router.get('/project/:projectId/ip-analysis/shodan', Ip.getLocationInfo)
router.post('/project/:projectId/ip-analysis/torList/refresh', TorList.getTorNodeInfo)
router.get('/project/:projectId/ip-analysis/tor', TorList.isTorAdress)
router.get('/checkModule',[], checkModule)

module.exports = router