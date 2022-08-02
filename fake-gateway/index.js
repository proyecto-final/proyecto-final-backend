const express = require('express')
require('dotenv').config()
const morgan = require("morgan");
const lambda = require('./lambda');

const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware');


require('./routes').forEach(({url, auth, filter, proxy}) => {
    if (auth) {
        app.use(url, lambda, createProxyMiddleware(filter, proxy))
    } else {
        app.use(url, createProxyMiddleware(filter, proxy));
    }
})
app.use(morgan('combined'));
app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`)
})


