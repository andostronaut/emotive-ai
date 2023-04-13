import * as p from '@clack/prompts'
import _ from 'lodash'
import Monkey from 'monkeylearn'

import { API_KEY } from './utils/constants'
import { transpileTag } from './utils/tag'
import { CliError } from './utils/cli-error'

export const process = ({ prompt }: { prompt: string }) => {
  getClassify({ prompt })
}

const getMonkeyApi = (key: string) => {
  const monkey = new Monkey(key)

  return monkey
}

const getMonkeyModel = (model: string) => {
  return model
}

const getClassify = ({ prompt }: { prompt: string }) => {
  const monkeyApi = getMonkeyApi(API_KEY)
  const model = getMonkeyModel('cl_NDBChtr7')

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
    .classify(model, data)
    .then((res: any) => {
      const { classifications } = res.body[0]
      const tag = transpileTag(classifications[0].tag_name)

      spinner.stop(`🎉 ${tag}`)
    })
    .catch(err => {
      spinner.stop('❌ Error occured on fetching response')

      throw new CliError(`Error occured on fetching response ${err.response}`)
    })
}
