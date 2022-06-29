const {Router} = require('express')
const router = Router()
const ModelTestSchema = require('../models/modelTest')

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
const checkDB = async(req, resp) => {

    let connection = true
    try{
        const model = new ModelTestSchema({name: 'name'})
        await model.save();

    } catch(err) {
        connection = false
    }
    return resp.status(connection ? 200 : 500).json({
        msg: connection ? 'sucessfully connected to Mongo DB' : 'Unable to connect with mongoDB'
    })
}


const checkModule = (req, resp) => {
    return resp.status(200).json({
        msg: 'Search Module :)'
    })
}


//NOTA: cuando lo vayan a usar este projectId recuerden que viene adentro de req.params como {projectId: value}
router.get('/project/:prijectId/siem/log/:logId',[], logInput)
router.get('/checkDB',[], checkDB)
router.get('/checkModule',[], checkModule)
module.exports = router