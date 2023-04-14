import { cli } from 'cleye'
import colors from 'picocolors'

import config from './commands/config'

import { COMMAND_NAME, VERSION } from './utils/constants'
import { handleCliError } from './utils/cli-error'

import { classifiers } from './classifiers'

cli(
  {
    name: COMMAND_NAME,
    version: VERSION,
    parameters: ['<text>'],
    commands: [config],
  },
  argv => {
    const prompt = argv._.join(' ')
    classifiers({ prompt }).catch(err => {
      console.error(`\n${colors.red('✖')} ${err.message}`)
      handleCliError(err)
      process.exit(1)
    })
  }
)
