# EmotiveAI

![build](https://github.com/iamando/emotive-ai/workflows/build/badge.svg)
![license](https://img.shields.io/github/license/iamando/emotive-ai?color=success)
![npm](https://img.shields.io/npm/v/emotive-ai)
![release](https://img.shields.io/github/release-date/iamando/emotive-ai)

Sentiment and emotion analysis cli that uses machine learning and natural language processing to identify and classify emotions in text data

## Usage

Recommended

```bash
npx emotive-ai <text>
```

Using global installation

```bash
npm install -g emotive-ai # npm
yarn add global emotive-ai # yarn


emotive-ai <text>
```

## Example

```bash
emotive-ai "Hello guys"

# response from processing
{
  tag_name: 'positive',
  confidence: '0.4338557'
}

emotive-ai  "It's really a bad day"

{
  tag_name: 'negative',
  confidence: '0.9047749'
}
```

## Support

EmotiveAI is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers.

## License

EmotiveAI is [MIT licensed](LICENSE).
