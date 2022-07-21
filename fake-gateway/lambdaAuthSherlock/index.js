const http = require('http');

const host = process.env.VALIDATOR_HOST;
const port = process.env.VALIDATOR_PORT;
function httpRequest(params, postData) {
    return new Promise(function (resolve, reject) {
        const req = http.request(params, function (res) {
            // cumulate data
            const returnedData ={code: res.statusCode, body: {msg: [res.statusMessage]}}
            
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
}

exports.handler = async (event) => {
    const { path, httpMethod, headers } = event;
    const options = {
        method: httpMethod,
        host,
        port,
        path,
        headers
    };
    let effect
    let finalMessage
    let finalCode
    try {
        const { code, body } = await httpRequest(options)
        finalCode = code
        effect = code === 200 ? "Allow" : "Deny"
        finalMessage = body
    } catch (err) {
        effect = 'Deny'
        finalCode = 500
        finalMessage = {msg: ['Server Error']}
    }
    return {
        policyDocument: {
            Version: "2012-10-17",
            message: finalMessage,
            code: finalCode,
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: "*" //TODO change to exact resource
                }]
        }
    };
}


