export namespace NNubankClient {
  export interface IInput {
    testEnv: boolean;
    timeout: number;
    credentials: {
      payment: {
        merchantKey: string;
        merchantToken: string;
      },
      conciliation: {
        merchantKey: string;
        merchantToken: string;
      }
    }
  }
}
