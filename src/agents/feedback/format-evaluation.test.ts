import { ExistingEvaluation } from '../../../types/evaluations';
import { CurrentEvaluation } from './types';
import { formatCurrentEvaluation } from './format-evaluation';

const sections: ExistingEvaluation['evaluation_sections'] = [
  {
    section_type: 'basic',
    good_points: ['good-1'],
    improvement_points: ['improve-1'],
    skill_score: 3,
    skill_max: 4,
    hospitality_score: 4,
    hospitality_max: 4,
    cleanliness_score: 4,
    cleanliness_max: 4,
    evaluation_items: [
      { item_name: 'item-1', category: 'skill', score: 3 },
      { item_name: 'item-2', category: 'hospitality', score: 4 },
      { item_name: 'item-3', category: 'cleanliness', score: 4 },
    ],
  },
  {
    section_type: 'barista',
    good_points: ['good-2'],
    improvement_points: ['improve-2'],
    skill_score: 4,
    skill_max: 4,
    hospitality_score: 3,
    hospitality_max: 4,
    cleanliness_score: 4,
    cleanliness_max: 4,
    evaluation_items: [
      { item_name: 'item-4', category: 'skill', score: 4 },
      { item_name: 'item-5', category: 'hospitality', score: 3 },
      { item_name: 'item-6', category: 'cleanliness', score: 4 },
    ],
  },
  {
    section_type: 'cashier',
    good_points: ['good-3'],
    improvement_points: ['improve-3'],
    skill_score: 4,
    skill_max: 4,
    hospitality_score: 4,
    hospitality_max: 4,
    cleanliness_score: 3,
    cleanliness_max: 4,
    evaluation_items: [
      { item_name: 'item-7', category: 'skill', score: 4 },
      { item_name: 'item-8', category: 'hospitality', score: 4 },
      { item_name: 'item-9', category: 'cleanliness', score: 3 },
    ],
  },
];

describe('formatCurrentEvaluation', () => {
  it('評価データを期待したデータに変換できる', () => {
    const input: ExistingEvaluation = {
      id: 'eval-1',
      status: 'completed',
      action_plan: 'お客様に笑顔で接する',
      total_comment: 'よくがんばっている',
      future_vision: 'ドリンク作成が上手なるようにしましょう',
      evaluation_sections: sections,
    };

    const expected: CurrentEvaluation = {
      skillRate: 91,
      hospitalityRate: 91,
      cleanlinessRate: 91,
      totalRate: 91,
      rank: 'A',
      actionPlan: 'お客様に笑顔で接する',
      totalComment: 'よくがんばっている',
      futureVision: 'ドリンク作成が上手なるようにしましょう',
    };

    const result = formatCurrentEvaluation(input);

    expect(result).toEqual(expected);
  });

  it('コメントが未記入の場合nullが返るか', () => {
    const input: ExistingEvaluation = {
      id: 'eval-1',
      status: 'completed',
      action_plan: null,
      total_comment: null,
      future_vision: null,
      evaluation_sections: sections,
    };

    const expected: CurrentEvaluation = {
      skillRate: 91,
      hospitalityRate: 91,
      cleanlinessRate: 91,
      totalRate: 91,
      rank: 'A',
      actionPlan: null,
      totalComment: null,
      futureVision: null,
    };

    const result = formatCurrentEvaluation(input);

    expect(result).toEqual(expected);
  });
});
