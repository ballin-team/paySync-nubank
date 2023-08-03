import {NApiRequest} from './types';
import {NubankApiRequest} from './nubank.apiRequest';

export class NubankConciliationClient extends NubankApiRequest {
  constructor(input: NApiRequest.IInput) {
    super(input);
  }
}
