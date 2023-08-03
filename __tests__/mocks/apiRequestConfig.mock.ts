import {NApiRequest} from '../../src';

export const configMock: NApiRequest.IInput = {
  testEnv: true,
  timeout: 30000,
  credentials: {
      merchantKey: '',
      merchantToken: '',
  },
};

export const defineApiRequestConfigEnv = (testEnv: boolean) => {
  const config = JSON.parse(JSON.stringify(configMock)) as NApiRequest.IInput;
  config.testEnv = testEnv;
  return config;
}
