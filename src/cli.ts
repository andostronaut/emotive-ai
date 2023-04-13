import { cli } from 'cleye'
import { red } from 'picocolors'

import config from './commands/config'

import { COMMAND_NAME, VERSION } from './utils/constants'
import { classify } from './classify'
import { handleCliError } from './utils/cli-error'

cli(
  {
    name: COMMAND_NAME,
    version: VERSION,
    parameters: ['<text>'],
    commands: [config],
  },
  argv => {
    const prompt = argv._.join(' ')
    classify({ prompt }).catch(err => {
      console.error(`\n${red('✖')} ${err.message}`)
      handleCliError(err)
      process.exit(1)
    })
  }
)
