import { calcRank } from './evaluation-calc';

describe('calcRank', () => {
  it('90以上はA', () => expect(calcRank(90)).toBe('A'));
  it('89はB(境界値)', () => expect(calcRank(89)).toBe('B'));
  it('70以上はB', () => expect(calcRank(70)).toBe('B'));
  it('69はC(境界値)', () => expect(calcRank(69)).toBe('C'));
  it('50はC', () => expect(calcRank(50)).toBe('C'));
  it('49はD(境界値)', () => expect(calcRank(49)).toBe('D'));
  it('0はD', () => expect(calcRank(0)).toBe('D'));
});
