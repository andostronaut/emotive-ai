import Monkey from 'monkeylearn'

import { API_KEY, MODEL_ID } from './constants'

const ml = new Monkey(API_KEY)
const model = MODEL_ID

export const getClassify = ({ prompt }: { prompt: string }) => {
  const data: string[] = []

  data.push(prompt)

  ml.classifiers
    .classify(model, data)
    .then((res: any) => {
      const { classifications } = res.body[0]
      console.log(classifications)
    })
    .catch(err => {
      throw new Error(err.response)
    })
}
