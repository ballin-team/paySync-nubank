import {defineApiRequestConfigEnv} from './mocks/apiRequestConfig.mock';
import {NApiRequest, NubankApiRequest} from '../src';
import nacl from 'tweetnacl';
import {AxiosResponse} from 'axios';

class DummyImplementation extends NubankApiRequest {
  constructor(input: NApiRequest.IInput) {
    super(input)
  }
  async checkAuthenticMessage(input: AxiosResponse) {
    return await this.isAuthenticMessage(input);
  }
}

describe('ApiRequest Use Case', () => {
  it('should throw if initialized without config arg', () => {
    // @ts-ignore
    expect(() => new NubankApiRequest({})).toThrow();
  });

  it('should define the environment based on testEnv arg', () => {
    const config = defineApiRequestConfigEnv(true);
    const instance = new DummyImplementation(config);
    expect(instance.env).toEqual('SANDBOX')
  });

  it('ensure that isAuthenticMessage method is properly working', async () => {
    const method = 'GET';
    const path = '/test';
    const timestamp = new Date().getTime();
    const body = {message: 'test '};
    const message = Buffer.from(`${method}${path}${timestamp}${JSON.stringify(body)}`);
    const keys = nacl.sign.keyPair();
    const signature = nacl.sign.detached(message, keys.secretKey);
    jest.spyOn(NubankApiRequest.prototype as any, 'getSigningKey').mockResolvedValueOnce(keys.publicKey);
    const config = defineApiRequestConfigEnv(true);
    const instance = new DummyImplementation(config);
    const response = await instance.checkAuthenticMessage({
      data: body,
      config: {
        method, url: `https://domain.com${path}`, headers: {
          get: (input: string) => {
            const headers: { [key: string]: any} = {'x-spin-signature': signature, 'x-spin-timestamp': timestamp};
            return headers[input];
          }
        }
      }
    } as any)
    expect(response).toBeTruthy();
  });
});
