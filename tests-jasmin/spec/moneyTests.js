import {formatCurrency} from '../../script/utils/money.js';

describe('Test suit:- formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2035)).toEqual('20.35');
  });
  
  it('Works with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('Rounds up to nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});