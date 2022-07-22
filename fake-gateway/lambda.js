const { handler } = require('./lambdaAuthSherlock');
const lambda = async (req, resp, next) => {
    const event = { path: req.originalUrl, httpMethod: req.method, headers: req.headers };
    const response = await handler(event)
    if (response.policyDocument.Statement[0].Effect === 'Allow') {
        next()
    } else {
        resp.status(response.policyDocument.code).json(response.policyDocument.message)
    }
};

module.exports = lambda