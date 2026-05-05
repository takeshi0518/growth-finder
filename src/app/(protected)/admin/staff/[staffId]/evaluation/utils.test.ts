import { formatEvaluationData } from './utils';
import {
  ExistingEvaluation,
  FormattedEvaluation,
} from '../../../../../../../types/evaluations';

describe('formatEvaluationData', () => {
  it('完全な評価データを期待通りの形式に整形できる', () => {
    const input: ExistingEvaluation = {
      id: 'eval-1',
      status: 'completed',
      action_plan: 'plan',
      total_comment: 'comment',
      future_vision: 'vision',
      evaluation_sections: [
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
      ],
    };
    const expected: FormattedEvaluation = {
      basic: {
        skill: { 'item-1': 3 },
        hospitality: { 'item-2': 4 },
        cleanliness: { 'item-3': 4 },
        good_points: ['good-1'],
        improvement_points: ['improve-1'],
      },
      barista: {
        skill: { 'item-4': 4 },
        hospitality: { 'item-5': 3 },
        cleanliness: { 'item-6': 4 },
        good_points: ['good-2'],
        improvement_points: ['improve-2'],
      },
      cashier: {
        skill: { 'item-7': 4 },
        hospitality: { 'item-8': 4 },
        cleanliness: { 'item-9': 3 },
        good_points: ['good-3'],
        improvement_points: ['improve-3'],
      },
    };
    const result = formatEvaluationData(input);

    expect(result).toEqual(expected);
  });
});
