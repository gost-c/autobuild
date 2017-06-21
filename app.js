const Koa = require('koa')
const errorHandler = require('koa-error')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const routes = require('./router')

const app = new Koa()
app.use(errorHandler())
if (process.env.NODE_ENV !== 'test') {
  app.use(logger())
}
app.use(bodyParser())
app.use(routes())

module.exports = app
