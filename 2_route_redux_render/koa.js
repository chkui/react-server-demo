'use strict';

import koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import compress from 'koa-compress'
import React from 'react'

const app = new koa()
app.keys = ['welcome!']
app.use(compress())
app.use(bodyParser())
app.use(json())
app.use(logger())

module.exports = app
module.exports.default = module.exports
