import { command } from 'cleye'
import colors from 'picocolors'
import { hasOwn, getConfig, setConfigs } from '../utils/config.js'
import { CliError, handleCliError } from '../utils/cli-error.js'

export default command(
  {
    name: 'config',
    parameters: ['[mode]', '[key=value...]'],
    description: 'Configure the CLI',
  },
  argv => {
    ;(async () => {
      const { mode, keyValue: keyValues } = argv._

      if (!keyValues.length) {
        console.error('Error: Missing required parameter "key=value"\n')
        argv.showHelp()
        return process.exit(1)
      }

      if (mode === 'get') {
        const config = await getConfig()
        for (const key of keyValues) {
          if (hasOwn(config, key)) {
            console.log(`${key}=${config[key as keyof typeof config]}`)
          }
        }
        return
      }

      if (mode === 'set') {
        await setConfigs(
          keyValues.map(keyValue => keyValue.split('=') as [string, string])
        )
        return
      }

      throw new CliError(`Invalid mode: ${mode}`)
    })().catch(error => {
      console.error(`\n${colors.red('✖')} ${error.message}`)
      handleCliError(error)
      process.exit(1)
    })
  }
)
