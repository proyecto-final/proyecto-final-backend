

const ROUTES = [

    {
        url: /^\/api\/(user|organization)\/.*$/,
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: process.env.USER_SERVICE_URL,
            changeOrigin: true,
        }
    },
    {
        url: /^\/api\/(ips|correlation|search|timeline)\/.*$/,
        auth: true,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: process.env.USER_SERVICE_URL, //todo change this to the correct url in .env
            changeOrigin: true,
        }
    }
]


module.exports = ROUTES
