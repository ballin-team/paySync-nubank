import {NNubankClient} from '../../src';

export const configMock: NNubankClient.IInput = {
  testEnv: true,
  timeout: 30000,
  credentials: {
    payment: {
      merchantKey: '',
      merchantToken: '',
    },
    conciliation: {
      merchantKey: '',
      merchantToken: ''
    }
  },
};

export const defineConfigEnv = (testEnv: boolean) => {
  const config = JSON.parse(JSON.stringify(configMock)) as NNubankClient.IInput;
  config.testEnv = testEnv;
  return config;
}
