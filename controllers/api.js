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
    execa('sh', ['-c', sh])
      .then(() => {
        fs.writeFileSync(dest, version)
        ctx.body = {
          status: 'ok',
          msg: 'all done'
        }
        return
      })
      .catch(err => {
        console.log(err)
        ctx.body = {
          status: 'error',
          msg: err
        }
        return
      })
  }

  ctx.body = {
    status: 'not match',
    msg: 'action not match'
  }
}
