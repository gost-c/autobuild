const fs = require('fs')
const execa = require('execa')
const debug = require('debug')('autobuild')
const util = require('util')

const wfa = util.promisify(fs.writeFile)

const sh = '/root/gost-update.sh'
const dest = '/home/wwwroot/default/gost-cli/version.html'
const full_name = 'gost-c/gost-cli'

exports.index = async ctx => {
  payload = ctx.request.body

  if (payload.action === 'published' && !payload.release.draft && !payload.release.prerelease && payload.repository.full_name === full_name) {
    debug(ctx.request.body)
    const version = payload.release.tag_name
    // not wait
    await wfa(dest, version)
    execa('sh', ['-c', sh])

    return ctx.body = {
      status: 'ok',
      msg: `buding version ${version}`,
      checkUrl: 'http://congz.pw/gost-cli/version.html'
    }
  }

  ctx.body = {
    status: 'not match',
    msg: 'action not match'
  }
}
