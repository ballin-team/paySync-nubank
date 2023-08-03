import {NubankClient} from '../src';

describe('Use Case - Nubank client', () => {
  it('should throw if initialized without config arg', () => {
    // @ts-ignore
    expect(() => new NubankClient()).toThrow();
  });
});
