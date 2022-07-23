

const ROUTES = [

    {
        url: /^\/api\/(user|organization).*$/,
        auth: false,
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
        url: /^\/api\/project\/[0-9]*\/correlate.*$/,
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: process.env.CORRELATION_SERVICE_URL, //todo change this to the correct url in .env
            changeOrigin: true,
        }
    },
    {
        url: /^\/api\/(timeline).*$/,
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: process.env.TIMELINE_SERVICE_URL, //todo change this to the correct url in .env
            changeOrigin: true,
        }
    },
    {
        url: /^\/api\/(ips).*$/,
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: process.env.IPS_SERVICE_URL, //todo change this to the correct url in .env
            changeOrigin: true,
        }
    },
    {
        url: /^\/api\/(search).*$/,
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: process.env.SEARCH_SERVICE_URL, //todo change this to the correct url in .env
            changeOrigin: true,
        }
    }
]


module.exports = ROUTES
