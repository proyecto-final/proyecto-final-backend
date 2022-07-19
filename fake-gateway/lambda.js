const lambdaAuthSherlock = require('./lambdaAuthSherlock');
const lambda = async (req, resp, next) => {
    const event = {req}
    const response = await lambdaAuthSherlock(event)
    if(response.policyDocument.Statement[0].Effect === 'Allow'){
        next()
    } else {
        resp.status(401).send('Unauthorized')
    }
};



module.exports = lambda