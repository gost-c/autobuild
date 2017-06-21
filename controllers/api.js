exports.index = async ctx => {
  console.log(ctx.request.body)
  ctx.body = ctx.request.body
}
