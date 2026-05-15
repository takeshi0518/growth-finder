import { calcRank, calcRate, SectionScores } from './evaluation-calc';

describe('calcRank', () => {
  it('90以上はA', () => expect(calcRank(90)).toBe('A'));
  it('89はB(境界値)', () => expect(calcRank(89)).toBe('B'));
  it('70以上はB', () => expect(calcRank(70)).toBe('B'));
  it('69はC(境界値)', () => expect(calcRank(69)).toBe('C'));
  it('50はC', () => expect(calcRank(50)).toBe('C'));
  it('49はD(境界値)', () => expect(calcRank(49)).toBe('D'));
  it('0はD', () => expect(calcRank(0)).toBe('D'));
});

describe('calcRate', () => {
  it('複数セクションのスコアが正しく合算され、各カテゴリのrateが計算される', () => {
    const input: SectionScores[] = [
      {
        section_type: 'basic',
        skill_score: 4,
        skill_max: 8,
        hospitality_score: 4,
        hospitality_max: 8,
        cleanliness_score: 6,
        cleanliness_max: 8,
      },
      {
        section_type: 'barista',
        skill_score: 7,
        skill_max: 8,
        hospitality_score: 4,
        hospitality_max: 8,
        cleanliness_score: 7,
        cleanliness_max: 8,
      },
      {
        section_type: 'basic',
        skill_score: 6,
        skill_max: 8,
        hospitality_score: 4,
        hospitality_max: 8,
        cleanliness_score: 6,
        cleanliness_max: 8,
      },
    ];

    const expected = {
      skillScore: 17,
      hospitalityScore: 12,
      cleanlinessScore: 19,
      skillRate: 70,
      hospitalityRate: 50,
      cleanlinessRate: 79,
      totalScore: 48,
      totalRate: 66,
    };

    const result = calcRate(input);
    expect(result).toEqual(expected);
  });
  it('引数に空の配列を渡したとき各rateが0にフォールバックされる', () => {
    const input: SectionScores[] = [];

    const expected = {
      skillScore: 0,
      hospitalityScore: 0,
      cleanlinessScore: 0,
      skillRate: 0,
      hospitalityRate: 0,
      cleanlinessRate: 0,
      totalScore: 0,
      totalRate: 0,
    };

    const result = calcRate(input);

    expect(result).toEqual(expected);
  });
});
