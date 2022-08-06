const http = require('http');

const host = process.env.VALIDATOR_HOST;
const port = process.env.VALIDATOR_PORT;
function httpRequest(params, postData) {
    const promise = new Promise(function (resolve, reject) {
        const req = http.request(params, function (res) {
            // cumulate data
            const returnedData = { code: res.statusCode, body: { msg: [res.statusMessage] } };
            let body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve({ ...returnedData, body: body || returnedData.body });
            });
        });
        req.on('error', function (err) {
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
    return promise;
}

exports.handler = async (event) => {
    const { path, requestContext, headers } = event;
    const { httpMethod } = requestContext
    const headersWithoutContentLength = { ...headers, 'Content-Length': 0 }
    const options = {
        method: httpMethod,
        host,
        port,
        path: `/api${path}`,
        headers: headersWithoutContentLength
    };
    let effect
    let message = {msg: ['internal error']}
    let responseCode = 500
    try {
        const { code, body } = await httpRequest(options)
        effect = code === 200 ? "Allow" : "Deny"
        responseCode = code
        message = code === 404 ? ['Permissions not defined for requested route'] : body.msg
    } catch (err) {
        effect = "Deny"
    }
    return {
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: "*"
                }
            ]
        },
        context: {
            code: responseCode,
            message
        }
    };
};


