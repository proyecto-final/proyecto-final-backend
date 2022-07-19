const express = require('express')
require('dotenv').config()
const morgan = require("morgan");

const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware');


require('./routes').forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    })
app.use(morgan('combined'));
app.listen(3001, () => {
  console.log(`App running on port 3001`)
})


