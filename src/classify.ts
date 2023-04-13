import * as p from '@clack/prompts'
import _ from 'lodash'
import Monkey from 'monkeylearn'

import { transpileTag, iconByTag } from './utils/tag'
import { CliError } from './utils/cli-error'
import { getConfig } from './utils/config'

const getMonkeyApi = (key: string) => {
  const monkey = new Monkey(key)

  return monkey
}

const getMonkeyModel = (model: string) => {
  return model
}

export const classify = async ({ prompt }: { prompt: string }) => {
  const { MONKEY_LEARN_API_KEY: key, MONKEY_LEARN_MODEL_ID: model } =
    await getConfig()

  if (!key) {
    throw new CliError(
      'Please set your MonkeyLearn API key via `emotive-ai config set MONKEY_LEARN_API_KEY=<your token>`'
    )
  }

  getClassify({ key, model, prompt })
}

const getClassify = ({
  key,
  model,
  prompt,
}: {
  key: string
  model: string
  prompt: string
}) => {
  const monkeyApi = getMonkeyApi(key)
  const monkeyModel = getMonkeyModel(model)

  const { classifiers } = monkeyApi

  const data: string[] = []

  if (_.isUndefined(prompt) || _.isEmpty(prompt)) {
    throw new CliError(
      'Prompt need to not be empty , please verify your prompt'
    )
  }

  data.push(prompt)

  const spinner = p.spinner()

  spinner.start('Getting response')

  classifiers
    .classify(monkeyModel, data)
    .then((res: any) => {
      const { classifications } = res.body[0]
      const tag: string = transpileTag(classifications[0].tag_name)

      spinner.stop(`${iconByTag[tag.toLowerCase()]} ${tag}`)
    })
    .catch(err => {
      throw new CliError(`Error occured on fetching response ${err.response}`)
    })
}
