export namespace NPayment {
  export interface IPaymentMethods {
    groups:         IGroup[];
    paymentMethods: IPaymentMethod[];
    schemas:        ISchemas;
  }

  export interface IGroup {
    name:  string;
    types: string[];
  }

  export interface IPaymentMethod {
    hasQRCode:  boolean;
    hasAppLink: boolean;
    name:       string;
    type:       string;
    image:      string;
  }

  export interface ISchemas {
    qrCode:        string;
    qrCodeContent: string;
  }
}

export namespace NCreatePayment {
  export interface IResponse {
    referenceId:    string;
    pspReferenceId: string;
    status:         string;
    code:           string;
    message:        string;
  }

  export interface IInput {
    merchantOrderReference: string;
    transactionId:          string;
    referenceId:            string;
    merchantName:           string;
    storeName:              string;
    amount:                 Amount;
    delayToAutoCancel:      number;
    paymentMethod:          PaymentMethod;
    paymentFlow:            PaymentFlow;
    shopper:                Shopper;
    shipping:               Shipping;
    billingAddress:         Address;
    items:                  Item[];
    orderUrl:               string;
    callbackUrl:            string;
  }

  export interface Amount {
    value:    number;
    currency: string;
    details:  Details;
  }

  export interface Details {
    taxValue: number;
  }

  export interface Address {
    country:      string;
    street:       string;
    number:       string;
    complement:   string;
    neighborhood: string;
    postalCode:   string;
    city:         string;
    state:        string;
  }

  export interface Item {
    id:                 string;
    description:        string;
    value:              number;
    quantity:           number;
    discount:           number;
    taxAmount:          number;
    amountExcludingTax: number;
    amountIncludingTax: number;
  }

  export interface PaymentFlow {
    returnUrl: string;
    cancelUrl: string;
  }

  export interface PaymentMethod {
    type: string;
  }

  export interface Shipping {
    value:   number;
    company: string;
    address: Address;
  }

  export interface Shopper {
    reference:    string;
    firstName:    string;
    lastName:     string;
    document:     string;
    documentType: string;
    email:        string;
    phone:        Phone;
    ip:           string;
    locale:       string;
  }

  export interface Phone {
    country: string;
    number:  string;
  }

}

export namespace NPaymentStatus {
  export interface IResponse {
    paymentMethodType: string;
    installmentNumber: number;
    referenceId:       string;
    pspReferenceId:    string;
    timestamp:         Date;
    status:            string;
    amount:            Amount;
    payer:             Payer;
  }

  export interface Amount {
    value:    number;
    currency: string;
  }

  export interface Payer {
    id: string;
  }

}

export namespace NCancelPayment {
  export interface IResponse {
    referenceId:    string;
    pspReferenceId: string;
    status:         string;
    code:           string;
    message:        string;
  }
}

export namespace NRefundPayment {
  export interface IInput {
    transactionRefundId: string;
    amount:              Amount;
    notes:               string;
  }

  export interface Amount {
    value:    number;
    currency: string;
  }

  export interface IResponse {
    refundId:       string;
    pspReferenceId: string;
    status:         string;
    dueDate:        null;
    error:          Error;
  }

  export interface Error {
    type:    string;
    message: string;
  }

}

export namespace NRefundedPayment {
  export interface IResponse {
    refundId:            string;
    pspReferenceId:      string;
    transactionRefundId: string;
    status:              string;
    dueDate:             null;
    amount:              Amount;
  }

  export interface Amount {
    value:    number;
    currency: string;
  }

}
