import _ from 'lodash'

interface TagMapping {
  positive: string
  negative: string
  neutral: string
  [key: string]: string
}

const tagMapping: TagMapping = {
  positive: 'Positive',
  negative: 'Negative',
  neutral: 'Neutral',
}

export const iconByTag: TagMapping = {
  positive: '😄',
  negative: '😢',
  neutral: '😶',
}

export const descByTag: TagMapping = {
  positive:
    'A positive sentiment tag indicates that the sentiment of a piece of text is generally positive. This could mean that the text expresses a favorable opinion, conveys happiness or excitement, or generally has a positive tone.',
  negative:
    'A negative sentiment tag indicates that the sentiment of a piece of text is generally negative. This could mean that the text expresses a critical opinion, conveys sadness or disappointment, or generally has a negative tone.',
  neutral:
    ' A neutral sentiment tag indicates that the sentiment of a piece of text is generally neutral or without a clear positive or negative sentiment. This could mean that the text is factual, informative, or does not express a strong opinion or emotion.',
}

export const transpileTag = (tag: string): string => {
  return tagMapping[tag] ?? tag
}

export const transpileConfidence = (confidence: string): string | null => {
  const conf = parseFloat(confidence)

  if (_.isNaN(conf)) return null

  return (conf * 100).toFixed(2) + '%'
}
