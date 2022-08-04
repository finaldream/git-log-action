import * as core from '@actions/core'
import simpleGit, {SimpleGit} from 'simple-git'

async function run(): Promise<void> {
  try {
    const git: SimpleGit = simpleGit()

    const baseRef = process.env.GITHUB_BASE_REF
    const headRef = process.env.GITHUB_HEAD_REF

    const commits = await git.log({
      from: baseRef,
      to: headRef,
      format: {
        message: '%s'
      },
      splitter: '\n',
      multiLine: false
    })

    const log = commits.all.map(commit => `* ${commit.message}`).join('\n')

    core.info(`baseRef: ${baseRef}`)
    core.info(`headRef: ${headRef}`)
    core.info(log)

    core.setOutput('log', log)
  } catch (error: any) {
    core.setFailed(error?.message)
  }
}

run()
