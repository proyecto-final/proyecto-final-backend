const { handler } = require('./lambdaAuthSherlock');
const lambda = async (req, resp, next) => {
    const event = { path: req.originalUrl.replace('/api', ''), requestContext: {httpMethod: req.method}, headers: req.headers };
    const response = await handler(event)
    if (response.policyDocument.Statement[0].Effect === 'Allow') {
        next()
    } else {
        resp.status(response.context.code).json({msg:[response.context.message]})
    }
};

module.exports = lambda