const http = require('http');

const host = 'http://localhost:3030'; //si no es prod usar http://localhost:3030
exports.handler = async (event, context) => {
    const { path, httpMethod } = event;

    const options = {
        method: httpMethod,
        host,
        path,
        headers: {
            'accept': 'application/json',
        }
    };
    const effect = await new Promise((resolve, reject) => {
        let dataStr = "";
        const req = http.request(options, (response) => {
            response.on('data', data => dataStr += data);
            response.on('end', () => {
                const { statusCode } = (JSON.parse(dataStr));
                if (statusCode === 200) {
                    context.succeed({
                        statusCode: 200,
                        body: JSON.stringify({
                            effect,
                            resource: path,
                            action: httpMethod,
                        })
                    })
                    return "Allow"
                }
                else {
                    return "Deny"
                }
            });
            req.end();
        });
    });
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
