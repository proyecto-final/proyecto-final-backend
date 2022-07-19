const http = require('http');

const host = 'localhost'; //si no es prod usar http://localhost:3030

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
        // reject on request error
        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
}

//preguntar a Rodri, para el logout me devuelve 2 veces lo mismo
exports.handler = async (event, context) => {
    const { path, httpMethod, headers } = event;
    const options = {
        method: httpMethod,
        host: `${host}`,
        port: 3030,
        path,
        headers
    };
    let effect
    try{
        await httpRequest(options)
        effect = 'Allow'
    }catch(err){
        console.log('error')
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


