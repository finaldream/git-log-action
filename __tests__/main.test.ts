import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['GITHUB_SERVER_URL'] = 'https://github.com'
  process.env['GITHUB_REPOSITORY'] = 'finaldream/git-log-action'
  process.env['GITHUB_BASE_REF'] = 'main'
  process.env['GITHUB_HEAD_REF'] = ''
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'index.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
