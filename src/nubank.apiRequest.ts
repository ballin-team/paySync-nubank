import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {NApiRequest} from './types';
import {HttpStatus, NubankApiError} from './helpers';
import nacl from 'tweetnacl';

export class NubankApiRequest {
  protected config: NApiRequest.IInput;
  public api: AxiosInstance;
  protected publicKey?: string;
  constructor(input: NApiRequest.IInput) {
    this.config = input;
    this.api = axios.create({
      baseURL: this.setHost(input.testEnv),
      timeout: input.timeout || 30000,
      headers: {
        'X-Merchant-Key': input.credentials.merchantKey,
        'X-Merchant-Token': input.credentials.merchantToken,
      },
      validateStatus: ((status) => status === HttpStatus.OK)
    });
  }
  private setHost(testEnv: boolean): string {
    if(testEnv) {
      return 'https://sandbox-api.spinpay.com.br/v1';
    }
    return 'https://api.spinpay.com.br/v1';
  }

  private async getSigningKey(): Promise<string> {
    const path = '/security/request-signing-keys';
    try {
      const { data} = await this.api.get<NApiRequest.ISigningKeyResponse>(path);
      return data.publicKey;
    } catch (e) {
      throw new NubankApiError({ path, data: e });
    }
  }

  protected async isAuthenticMessage(response: AxiosResponse) {
    if(!this.publicKey) {
      this.publicKey = await this.getSigningKey();
    }

    const signature = response.config?.headers.get('x-spin-signature') as string;

    const message = response.config.method + new URL(response.config?.url || '').pathname + response.config?.headers.get('x-spin-timestamp') + JSON.stringify(response.data);
    return nacl.sign.detached.verify(Buffer.from(message), Buffer.from(signature), Buffer.from(this.publicKey, 'base64'));
  }

  get env () {
    return this.config.testEnv ? 'SANDBOX' : 'PRODUCTION';
  }
}
