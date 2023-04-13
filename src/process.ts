import Monkey from 'monkeylearn'

import { API_KEY } from './utils/constants'

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
  const mk = getMonkeyApi(API_KEY)
  const model = getMonkeyModel('cl_NDBChtr7')

  const { classifiers } = mk

  const data: string[] = []
  data.push(prompt)

  classifiers
    .classify(model, data)
    .then((res: any) => {
      const { classifications } = res.body[0]
      console.log(classifications)
    })
    .catch(err => {
      throw new Error(err.response)
    })
}
