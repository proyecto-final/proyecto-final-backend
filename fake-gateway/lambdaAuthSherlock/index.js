const http = require('http');

const host = process.env.VALIDATOR_HOST;
const port = process.env.VALIDATOR_PORT;
function httpRequest(params, postData, headers) {
    return new Promise(function(resolve, reject) {
        var req = http.request(params, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', function(err) {
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
    try{
        await httpRequest(options)
        effect = 'Allow'
    }catch(err){
        effect = 'Deny'
    }
    return {
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: "*" //TODO change to exact resource
                }]
        }
    };
}


