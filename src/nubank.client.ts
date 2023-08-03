import {NNubankClient} from './types';
import {NubankPaymentClient} from './nubankPayment.client';
import {NubankConciliationClient} from './NubankConciliation.client';

export class NubankClient {
  private config: NNubankClient.IInput;
  public payment: NubankPaymentClient;
  public conciliation: NubankConciliationClient;
  constructor(input: NNubankClient.IInput) {
    this.config = input;
    const paymentCredentials = input.credentials.payment;
    const conciliationCredentials = input.credentials.conciliation;
    this.payment = new NubankPaymentClient({ ...input, credentials: { merchantKey: paymentCredentials.merchantKey, merchantToken: paymentCredentials.merchantToken}});
    this.conciliation = new NubankConciliationClient({ ...input, credentials: { merchantKey: conciliationCredentials.merchantKey, merchantToken: conciliationCredentials.merchantToken}});
  }
}
