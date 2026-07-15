import { describe, it, expect } from 'vitest';
import { judgeDirection } from './trend';

describe('judgeDirection', () => {
  it('レートが上昇していれば improving', () => {
    expect(judgeDirection([70, 74, 78, 82])).toBe('improving');
  });
  it('レートが下降していれば declining', () => {
    expect(judgeDirection([82, 78, 74, 70])).toBe('declining');
  });
  it('横ばいなら stable', () => {
    expect(judgeDirection([75, 76, 75, 76])).toBe('stable');
  });
  it('4件未満は判定できず stable', () => {
    expect(judgeDirection([70, 75, 80])).toBe('stable');
  });
});
