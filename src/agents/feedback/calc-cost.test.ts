import { calcCost } from './calc-cost';

describe('calcCost', () => {
  it('haikuのトークン数からコストを算出する', () => {
    const MODEL = 'claude-haiku-4-5';
    const input_tokens = 850;
    const output_tokens = 90;
    const expected = 0.0013;

    const result = calcCost(MODEL, input_tokens, output_tokens);

    expect(result).toBeCloseTo(expected);
  });
  it('未知のモデルは0を返す', () => {
    expect(calcCost('unknown-model', 1000, 1000)).toBe(0);
  });
});
