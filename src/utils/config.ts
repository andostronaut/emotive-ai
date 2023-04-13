import fs from 'node:fs/promises'
import os from 'os'
import ini from 'ini'
import path from 'path'

import { CliError } from './cli-error'

const { hasOwnProperty } = Object.prototype
export const hasOwn = (object: unknown, key: PropertyKey) =>
  hasOwnProperty.call(object, key)

const configParsers = {
  MONKEY_LEARN_API(key?: string) {
    if (!key) {
      throw new CliError(
        `Please set your MonkeyLearn API key config set MONKEY_LEARN_API=<your token>`
      )
    }

    return key
  },
  MONKEY_LEARN_MODEL(model?: string) {
    if (!model || model.length === 0) {
      return 'cl_NDBChtr7'
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
