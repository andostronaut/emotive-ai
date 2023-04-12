declare module 'monkeylearn' {
  interface MonkeyLearnOptions {
    baseUrl?: string
    token?: string
    version?: string
  }

  interface MonkeyLearnResponse {
    body: any
    status: number
    headers: any
  }

  interface MonkeyLearnClassifier {
    detail(id: string): Promise<MonkeyLearnResponse>
    classify(
      id: string,
      data: string[] | string[][]
    ): Promise<MonkeyLearnResponse>
    classifyUrl(
      id: string,
      urls: string[] | string[][]
    ): Promise<MonkeyLearnResponse>
    list(params?: object): Promise<MonkeyLearnResponse>
    create(name: string, options?: object): Promise<MonkeyLearnResponse>
    delete(id: string): Promise<MonkeyLearnResponse>
    update(
      id: string,
      name: string,
      options?: object
    ): Promise<MonkeyLearnResponse>
    deploy(id: string): Promise<MonkeyLearnResponse>
    undeploy(id: string): Promise<MonkeyLearnResponse>
    run(id: string, data: string[] | string[][]): Promise<MonkeyLearnResponse>
  }

  interface MonkeyLearnExtraction {
    detail(id: string): Promise<MonkeyLearnResponse>
    extract(
      id: string,
      data: string[] | string[][] | object[] | object[][],
      productionModel?: boolean,
      batch?: boolean,
      language?: string,
      maxWords?: number
    ): Promise<MonkeyLearnResponse>
    extractUrls(
      id: string,
      urls: string[] | string[][] | object[] | object[][],
      productionModel?: boolean,
      batch?: boolean,
      language?: string,
      maxWords?: number
    ): Promise<MonkeyLearnResponse>
    list(params?: object): Promise<MonkeyLearnResponse>
    create(
      name: string,
      fields: object[],
      options?: object
    ): Promise<MonkeyLearnResponse>
    delete(id: string): Promise<MonkeyLearnResponse>
    update(
      id: string,
      name: string,
      fields: object[],
      options?: object
    ): Promise<MonkeyLearnResponse>
    run(
      id: string,
      data: string[] | string[][] | object[] | object[][]
    ): Promise<MonkeyLearnResponse>
  }

  class MonkeyLearn {
    constructor(apiKey: string, options?: MonkeyLearnOptions)
    classifiers: MonkeyLearnClassifier
    extractions: MonkeyLearnExtraction
  }

  export default MonkeyLearn
}
