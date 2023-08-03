export namespace NApiRequest {
  export interface IInput {
    testEnv: boolean;
    timeout: number;
    credentials: {
      merchantKey: string;
      merchantToken: string;
    }
  }

  export interface ISigningKeyResponse {
    publicKey: string;
  }

  export interface IErrorResponse { status: number; message: string; details?: any };
}
