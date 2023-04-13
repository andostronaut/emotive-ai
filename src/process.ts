import { getClassify } from './utils/monkey'

export const process = ({ prompt }: { prompt: string }) => {
  getClassify({ prompt })
}
