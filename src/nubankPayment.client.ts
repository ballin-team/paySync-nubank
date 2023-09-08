import {
  NCancelPayment,
  NCreatePayment,
  NPayment,
  NPaymentStatus,
  NRefundedPayment,
  NRefundPayment
} from './types';
import {NubankApiError} from './helpers';
import {NubankApiRequest} from './nubank.apiRequest';

export class NubankPaymentClient extends NubankApiRequest {
  /**
   * This method returns available payment methods configured for the merchant and the information each method requires on payment creation.
   *
   * For NuPay integration, we recommend to use the AppLink returned by Payment Creation response.
   * For Pix integration, we return the schema to obtain the QR Code and the QR Code Content.
   * The groups field separates different payment methods into categories.
   *
   * [Details](https://docs.nupaybusiness.com.br/en/checkout/merchants/openapi/#tag/Checkout/operation/PaymentMethodsGet)
   */
  public async getPaymentMethods(): Promise<NPayment.IPaymentMethods> {
    const path = '/checkouts/payment-methods';
    try {
      const response = await this.api.get<NPayment.IPaymentMethods>(path);
      const { data } = response;
      const isAuthentic = await this.isAuthenticMessage(response)
      if(!isAuthentic) throw new NubankApiError({ path, data, isAuthentic });
      return data;
    } catch (e: unknown) {
      throw new NubankApiError({ path, data: e });
    }
  }

  /**
   * This method creates a new payment request, and it's the same method for creating either Pix or NuPay payments, the difference is in the data sent on the request. Check our request samples for more information.
   *
   * [Details](https://docs.nupaybusiness.com.br/en/checkout/merchants/openapi/#tag/Checkout/operation/PaymentsPost)
   */
  public async createPayment(input: NCreatePayment.IInput): Promise<NCreatePayment.IResponse> {
    const path = '/checkouts/payments';
    try {
      const response = await this.api.post<NCreatePayment.IResponse>(path, input);
      const { data } = response;
      const isAuthentic = await this.isAuthenticMessage(response)
      if(!isAuthentic) throw new NubankApiError({ path, data, isAuthentic });
      return data;
    } catch (e) {
      throw new NubankApiError({ path, data: e });
    }
  }

  /**
   * Get a **payment** order status.
   * The response will contain information about the **payment**. It may include refunds' identification, if exists.
   *
   * [Details](https://docs.nupaybusiness.com.br/en/checkout/merchants/openapi/#tag/Checkout/operation/PaymentsStatusByPspReferenceIdGet)
   */
  public async getPaymentStatus(id: string): Promise<NPaymentStatus.IResponse> {
    const path = `/checkouts/payments/${id}/status`;
    try {
      const response = await this.api.get<NPaymentStatus.IResponse>(path);
      const { data } = response;
      const isAuthentic = await this.isAuthenticMessage(response)
      if(!isAuthentic) throw new NubankApiError({ path, data, isAuthentic });
      return data;
    } catch (e) {
      throw new NubankApiError({ path, data: e });
    }
  }

  /**
   * Cancels a payment as long as it hasn't been paid yet, i.e. payments on *WAITING_FOR_PAYMENT_METHOD* state.
   * If it has been paid, a refund must be requested.
   *
   * [Details](https://docs.nupaybusiness.com.br/en/checkout/merchants/openapi/#tag/Checkout/operation/PaymentsCancelByPspReferenceIdPost)
   */
  public async cancelPayment(id: string): Promise<NCancelPayment.IResponse> {
    const path = `/checkouts/payments/${id}/cancel`;
    try {
      const response = await this.api.post<NCancelPayment.IResponse>(path);
      const { data } = response;
      const isAuthentic = await this.isAuthenticMessage(response)
      if(!isAuthentic) throw new NubankApiError({ path, data, isAuthentic });
      return data;
    } catch (e) {
      throw new NubankApiError({ path, data: e });
    }
  }

  /**
   * This method should be used to **refund** a payment that has been paid by the customer.
   * Partial refunds are allowed for a payment paid with either Pix or NuPay, given that the sum of partial refunds open and completed doesn't exceed the total amount of the original payment.
   * The status of the refund will change as it is processed, so the merchant system is accountable to monitor these changes via **notifications** as described in the corresponding section.
   *
   * [Details](https://docs.nupaybusiness.com.br/en/checkout/merchants/openapi/#tag/Checkout/operation/PaymentsRefundByPspReferenceIdPost)
   */
  public async refundPayment(id: string, body: NRefundPayment.IInput): Promise<NRefundPayment.IResponse> {
    const path = `/checkouts/payments/${id}/refunds`;
    try {
      const response = await this.api.post<NRefundPayment.IResponse>(path, body);
      const { data } = response;
      const isAuthentic = await this.isAuthenticMessage(response)
      if(!isAuthentic) throw new NubankApiError({ path, data, isAuthentic });
      return data;
    } catch (e) {
      throw new NubankApiError({ path, data: e });
    }
  }

  /**
   * This method returns information for the **refund** (*refundId*) of a payment (*paymentId*) specified as request parameters.
   *
   * [Details](https://docs.nupaybusiness.com.br/en/checkout/merchants/openapi/#tag/Checkout/operation/PaymentsRefundByIdGet)
   */
  public async getRefundedPayment(paymentId: string, refundId: string): Promise<NRefundedPayment.IResponse> {
    const path = `/checkouts/payments/${paymentId}/refunds/${refundId}`;
    try {
      const response = await this.api.get<NRefundedPayment.IResponse>(path);
      const { data } = response;
      const isAuthentic = await this.isAuthenticMessage(response)
      if(!isAuthentic) throw new NubankApiError({ path, data, isAuthentic });
      return data;
    } catch (e) {
      throw new NubankApiError({ path, data: e });
    }
  }
}
