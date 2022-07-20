const express = require('express')
require('dotenv').config()
const morgan = require("morgan");
const lambda = require('./lambda');

const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware');


require('./routes').forEach(route => {
        if(route.auth){
            app.use(route.url, lambda ,createProxyMiddleware(route.proxy))
        } else {
            app.use(route.url, createProxyMiddleware(route.proxy));
        }
    })
app.use(morgan('combined'));
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})


