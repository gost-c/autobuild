const fs = require('fs')
const execa = require('execa')
const debug = require('debug')('autobuild')

const sh = '/root/gost-update.sh'
const dest = '/home/wwwroot/default/gost-cli/version'
const full_name = 'gost-c/gost-cli'

exports.index = async ctx => {
  payload = ctx.request.body

  if (payload.action === 'published' && !payload.release.draft && !payload.release.prerelease) {
    debug(ctx.request.body)
    const version = payload.release.tag_name
    // not wait
    execa('sh', ['-c', sh])
    fs.writeFileSync(dest, version)

    return ctx.body = {
      status: 'ok',
      msg: `buding version ${version}`,
      checkUrl: 'http://congz.pw/gost-cli/version'
    }
  }

  ctx.body = {
    status: 'not match',
    msg: 'action not match'
  }
}
