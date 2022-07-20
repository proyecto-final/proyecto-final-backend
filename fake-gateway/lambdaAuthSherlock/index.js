const http = require('http');

const host = process.env.VALIDATOR_HOST;
const port = process.env.VALIDATOR_PORT;
function httpRequest(params, postData, headers) {
    return new Promise(function (resolve, reject) {
        const req = http.request(params, function (res) {
            // cumulate data
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
                resolve({code: res.statusCode,body});
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

exports.handler = async (event, context) => {
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
    try {
        const {code, body} = await httpRequest(options)
        if (code === 200) {
            effect = "Allow"
        } else {
            effect = "Deny"
            finalMessage = body.msg
        }
    } catch (err) {
        effect = 'Deny'
    }
    return {
        policyDocument: {
            Version: "2012-10-17",
            message: finalMessage,
            code,
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: "*" //TODO change to exact resource
                }]
        }
    };
}


