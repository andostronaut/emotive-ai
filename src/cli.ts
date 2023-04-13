import { cli } from 'cleye'
import { COMMAND_NAME, VERSION } from './utils/constants'
import { process } from './process'
import config from './commands/config'

cli(
  {
    name: COMMAND_NAME,
    version: VERSION,
    parameters: ['<text>'],
    commands: [config],
  },
  argv => {
    const prompt = argv._.join(' ')
    process({ prompt })
  }
)
