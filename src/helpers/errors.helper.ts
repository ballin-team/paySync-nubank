import {AxiosError} from 'axios';
import {HttpStatus} from './httpStatusCode.helper';
import {NApiRequest} from '../types';

export class NubankApiError extends Error {
  path: string;
  status?: HttpStatus;
  details?: any;

  constructor(input: { path: string, data: unknown, isAuthentic?: boolean}) {
    let message = 'unknown error';
    if(typeof input.isAuthentic === 'boolean'  && !input.isAuthentic) {
      message = 'Unauthenticated message'
    }
    if (input.data instanceof Error) message = input.data.message;
    super(message);
    Object.setPrototypeOf(this, NubankApiError.prototype);
    this.name = 'NubankApiError';
    this.path = input.path;

    if (input.data instanceof AxiosError) {
      const data = input.data as AxiosError<NApiRequest.IErrorResponse>;
      const response = data.response?.data;
      this.status = response?.status;
      this.message = response?.message || 'unknown error';
      this.details = response?.details;
    } else {
      this.details = input.data;
    }


    console.error(this);
  }
}
