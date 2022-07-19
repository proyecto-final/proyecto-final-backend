const ROUTES = [
    {
        url: '/api/user/authenticate|/api-docs|/api/organization/validate-invitation-token|/api/organization/user',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3030",
            changeOrigin: true,
        }
    },
    {
        url: '/api/user|organization/*',
        auth: true,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3030",
            changeOrigin: true,
        }
    }
]


module.exports = ROUTES
