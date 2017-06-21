const compose = require('koa-compose')
const Router = require('koa-router')
const api = require('../controllers/api')

const router = new Router()

router.post('/', api.index)

module.exports = () => compose([
  router.routes(),
  router.allowedMethods()
])
