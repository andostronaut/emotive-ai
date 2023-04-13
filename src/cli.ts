import { cli } from 'cleye'
import { COMMAND_NAME, VERSION } from './utils/constants'
import { prompts } from './prompts'

cli(
  {
    name: COMMAND_NAME,
    version: VERSION,
    parameters: ['<text>'],
  },
  argv => {
    const prompt = argv._.join(' ')
    prompts({ prompt })
  }
)
