import fs from 'node:fs/promises'
import os from 'os'
import ini from 'ini'
import path from 'path'
import * as p from '@clack/prompts'
import colors from 'picocolors'

import { CliError, handleCliError } from './cli-error'
import { CANCELED_OP_MSG } from './constants'

const { hasOwnProperty } = Object.prototype
export const hasOwn = (object: unknown, key: PropertyKey) =>
  hasOwnProperty.call(object, key)

const configParsers = {
  MONKEY_LEARN_API_KEY(key?: string) {
    if (!key) {
      throw new CliError(
        'Please set your MonkeyLearn API key via `emotive-ai config set MONKEY_LEARN_API_KEY=<your token>`'
      )
    }

    return key
  },
  MONKEY_LEARN_MODEL_ID(model?: string) {
    if (!model || model.length === 0) {
      throw new CliError(
        'Please set your MonkeyLearn Model ID `emotive-ai config set MONKEY_LEARN_MODEL_ID=<your model id>`'
      )
    }

    return model
  },
} as const

type ConfigKeys = keyof typeof configParsers

type RawConfig = {
  [key in ConfigKeys]?: string
}

type ValidConfig = {
  [Key in ConfigKeys]: ReturnType<(typeof configParsers)[Key]>
}

const configPath = path.join(os.homedir(), '.emotive-ai')

const fileExists = (filePath: string) =>
  fs.lstat(filePath).then(
    () => true,
    () => false
  )

const readConfigFile = async (): Promise<RawConfig> => {
  const configExists = await fileExists(configPath)
  if (!configExists) {
    return Object.create(null)
  }

  const configString = await fs.readFile(configPath, 'utf8')
  return ini.parse(configString)
}

export const getConfig = async (
  cliConfig?: RawConfig
): Promise<ValidConfig> => {
  const config = await readConfigFile()
  const parsedConfig: Record<string, unknown> = {}

  for (const key of Object.keys(configParsers) as ConfigKeys[]) {
    const parser = configParsers[key]
    const value = cliConfig?.[key] ?? config[key]
    parsedConfig[key] = parser(value)
  }

  return parsedConfig as ValidConfig
}

export const setConfigs = async (keyValues: [key: string, value: string][]) => {
  const config = await readConfigFile()

  for (const [key, value] of keyValues) {
    if (!hasOwn(configParsers, key)) {
      throw new CliError(`Invalid config property: ${key}`)
    }

    const parsed = configParsers[key as ConfigKeys](value)
    config[key as ConfigKeys] = parsed as any
  }

  await fs.writeFile(configPath, ini.stringify(config), 'utf8')
}

export const showConfigUI = async () => {
  try {
    const config = await getConfig()

    const choice = (await p.select({
      message: 'Set config:',
      options: [
        {
          label: 'MonkeyLearn API Key',
          value: 'MONKEY_LEARN_API_KEY',
          hint: hasOwn(config, 'MONKEY_LEARN_API_KEY')
            ? config.MONKEY_LEARN_API_KEY.slice(0, 3) +
              '...' +
              config.MONKEY_LEARN_API_KEY.slice(-3)
            : '(not set)',
        },
        {
          label: 'MonkeyLearn Model ID',
          value: 'MONKEY_LEARN_MODEL_ID',
          hint: hasOwn(config, 'MONKEY_LEARN_MODEL_ID')
            ? config.MONKEY_LEARN_MODEL_ID
            : '(not set)',
        },
      ],
    })) as ConfigKeys | 'cancel' | symbol

    if (p.isCancel(choice)) {
      p.cancel(CANCELED_OP_MSG)
      process.exit(0)
    }

    if (choice === 'MONKEY_LEARN_API_KEY') {
      const key = await p.text({
        message: 'Enter your MonkeyLearn API key',
        validate: value => {
          if (!value) return 'API Key must be defined'
        },
      })
      if (p.isCancel(key)) {
        p.cancel(CANCELED_OP_MSG)
        process.exit(0)
      }
      setConfigs([['MONKEY_LEARN_API_KEY', key]])
    } else if (choice === 'MONKEY_LEARN_MODEL_ID') {
      const model = await p.text({
        message: 'Enter the model you want to use',
        validate: value => {
          if (!value) return 'Model ID must be defined'
        },
      })
      if (p.isCancel(model)) {
        p.cancel(CANCELED_OP_MSG)
        process.exit(0)
      }
      setConfigs([['MONKEY_LEARN_MODEL_ID', model]])
    }

    showConfigUI()
  } catch (error: any) {
    console.error(`\n${colors.red('✖')} ${error.message}`)
    handleCliError(error)
    process.exit(1)
  }
}
