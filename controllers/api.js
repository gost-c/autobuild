const debug = require('debug')('autobuild')

exports.index = async ctx => {
  debug(ctx.request.body)
  ctx.body = ctx.request.body
}
