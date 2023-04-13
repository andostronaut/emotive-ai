# EmotiveAI

![build](https://github.com/iamando/emotive-ai/workflows/build/badge.svg)
![license](https://img.shields.io/github/license/iamando/emotive-ai?color=success)
![npm](https://img.shields.io/npm/v/emotive-ai)
![release](https://img.shields.io/github/release-date/iamando/emotive-ai)

Sentiment and emotion analysis cli that uses machine learning and natural language processing to identify and classify emotions in text data

## Setup

Get your MONKEY_LEARN_API_KEY from [MonkeyLearn](https://monkeylearn.com/signup/)

> You'l have to create a account and use the trial mode just to test it

Set your API_KEY via :

```bash
emotive-ai config set MONKEY_LEARN_API_KEY=<your key>
```

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
emotive-ai hello guys # Positive

emotive-ai its really a bad day # Negative
```

## Support

EmotiveAI is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers.

## License

EmotiveAI is [MIT licensed](LICENSE).
