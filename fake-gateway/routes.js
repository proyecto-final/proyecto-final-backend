

const ROUTES = [

    {
        url: /^\/api\/(user|organization).*$/,
        auth: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        filter: () => true,
        proxy: {
            target: process.env.USER_SERVICE_URL,
            changeOrigin: true,
        }
    },
     {
        url: /^\/api\/project\/[0-9]*\/(correlate).*$/,
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        filter: (pathName, req) => {
            const evtxConverterPathRegex = /^\/api\/project\/[0-9]*\/(correlate)\/log$/
            return !(evtxConverterPathRegex.test(pathName) && req.method === 'POST')
        },
        proxy: {
            target: process.env.CORRELATION_SERVICE_URL, //todo change this to the correct url in .env
            changeOrigin: true,
        }
    },
     {
        url: /^\/api\/project\/[0-9]*\/(correlate)\/log$/,
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        filter: (pathName, req) => {
            return req.method === 'POST'
        },
        proxy: {
            target: process.env.EVTX_CONVERTER_SERVICE_URL, //todo change this to the correct url in .env
            changeOrigin: true,
        }
    },
    {
        url: /^\/api\/project\/[0-9]*\/(timeline).*$/,
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        filter: () => true,
        proxy: {
            target: process.env.TIMELINE_SERVICE_URL,
            changeOrigin: true,
        }
    },
    {
        url: /^\/api\/project\/[0-9]\/log\/[a-f\d]{24}\/timeline\/[a-f\d]{24}\/report*$/,
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        filter: () => true,
        proxy: {
            target: process.env.TIMELINE_SERVICE_URL,
            changeOrigin: true,
        }
    },
    {
        url: /^\/api\/project\/[0-9]\/ip-analysis.*$/,
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        filter: () => true,
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
        filter: () => true,
        proxy: {
            target: process.env.SEARCH_SERVICE_URL, //todo change this to the correct url in .env
            changeOrigin: true,
        }
    }
]


module.exports = ROUTES
