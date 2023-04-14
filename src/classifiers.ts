import * as p from '@clack/prompts'
import _ from 'lodash'
import Monkey from 'monkeylearn'
import dedent from 'dedent'

import {
  transpileTag,
  iconByTag,
  descByTag,
  transpileConfidence,
} from './utils/tag'
import { CliError } from './utils/cli-error'
import { getConfig } from './utils/config'

const getMonkeyApi = (key: string) => {
  const monkey = new Monkey(key)

  return monkey
}

const getMonkeyModel = (model: string) => {
  return model
}

export const classifiers = async ({ prompt }: { prompt: string }) => {
  const { MONKEY_LEARN_API_KEY: key, MONKEY_LEARN_MODEL_ID: model } =
    await getConfig()

  if (!key) {
    throw new CliError(
      'Please set your MonkeyLearn API key via `emotive-ai config set MONKEY_LEARN_API_KEY=<your token>`'
    )
  }

  if (!model) {
    throw new CliError(
      'Please set your MonkeyLearn Model ID via `emotive-ai config set MONKEY_LEARN_MODEL_ID=<your model id>`'
    )
  }

  classify({ key, model, prompt })
}

const classify = ({
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
      const cls = classifications[0]

      const tagAndConfidence: string = dedent`${
        iconByTag[cls.tag_name]
      } : ${transpileTag(cls.tag_name)} with ${transpileConfidence(
        cls.confidence
      )} of confidence`
      const desc: string = dedent`${descByTag[cls.tag_name]}`
      const next: string = dedent`🎉 Ready for the next!`

      const response = tagAndConfidence + '\n\n' + desc + '\n\n' + next

      spinner.stop(response)
    })
    .catch(err => {
      spinner.stop('')
      throw new CliError(`Error occured on fetching response ${err.response}`)
    })
}
