import Monkey from 'monkeylearn'

const ml = new Monkey('03c470f28e3a0e76cbc614539f5495160ea9643d')

const model_id = 'cl_NDBChtr7'

const data: string[] = ['This is a great tool!']

ml.classifiers.classify(model_id, data).then((res: any) => {
  console.log(res.body)
  console.log(res.body[0].classifications)
})
