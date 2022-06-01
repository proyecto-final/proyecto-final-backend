const {Router} = require('express')
const router = Router()
const {connectDB} = require('../database/database.config')

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

const pingDB = async(req, resp) => {
    //por ahora solo uso la dependencia mysql para no tener que complicar con el orm
    const response = await connectDB();
    resp.status(response ? 200 : 500).json({
        msg: response ? 'connected to database' : 'database unreachable',
    })
}

router.post('/user/authenticate',[], logInput)
router.post('/user/authorize',[], logInput)
router.put('/user/logout',[], logInput)

router.get('/organization',[], logInput)
router.post('/organization',[], logInput)

//NOTA: cuando lo vayan a usar este organizationId recuerden que viene adentro de req.params como {organizationId: value}
router.get('/organization/:organizationId',[], logInput)
router.put('/organization/:organizationId',[], logInput)

router.post('/organization/:organizationId/generate-link',[], logInput)
router.post('/organization/:organizationId/user',[], logInput)

router.put('/organization/:organizationId/user/:userId',[], logInput)
router.delete('/organization/:organizationId/user/:userId',[], logInput)

router.post('/organization/:organizationId/project',[], logInput)
router.get('/organization/:organizationId/project',[], logInput)

router.get('/organization/:organizationId/project/:projectId',[], logInput)
router.patch('/organization/:organizationId/project/:projectId',[], logInput)


router.get('/testdb',[], pingDB)


module.exports = router