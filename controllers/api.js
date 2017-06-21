const fs = require('fs')
const execa = require('execa')
const debug = require('debug')('autobuild')

const sh = '/root/gost-update.sh'
const dest = '/home/wwwroot/default/gost-cli/version'
const full_name = 'gost-c/gost-cli'

exports.index = async ctx => {
  debug(ctx.request.body)

  payload = ctx.request.body

  if (payload.action === 'published' && !payload.release.draft && !payload.release.prerelease) {
    const version = payload.release.tag_name
    try {
      await execa('sh', ['-c', sh])
      fs.writeFileSync(dest, version)
      return ctx.body = {
        status: 'ok',
        msg: 'all done'
      }
    } catch (err) {
      console.log(err)
      return ctx.body = {
        status: 'error',
        msg: err
      }
    }
  }

  ctx.body = {
    status: 'not match',
    msg: 'action not match'
  }
}
