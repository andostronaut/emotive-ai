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

export const transpileTag = (tag: string): string => {
  return tagMapping[tag] ?? tag
}

export const iconByTag: TagMapping = {
  positive: '😄',
  negative: '😢',
  neutral: '😶',
}
