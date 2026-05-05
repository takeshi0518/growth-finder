import { SectionData } from '@/lib/validations/schemas';
import {
  EvaluationItem,
  ExistingEvaluation,
  FormattedEvaluation,
} from '../../../../../../../types/evaluations';

const createEmptySectionData = (): SectionData => ({
  skill: {},
  hospitality: {},
  cleanliness: {},
  good_points: [],
  improvement_points: [],
});

//evaluation_itemsをcategoryごとに{item_name: score}の形に整形する
export const formatCategoryScores = (items: EvaluationItem[]) =>
  items.reduce<SectionData>((acc, cur) => {
    if (!acc[cur.category]) acc[cur.category] = {};
    acc[cur.category][cur.item_name] = cur.score ?? 0;
    return acc;
  }, createEmptySectionData());

//既存評価データをEvaluationFormのdefaultValues形式に整形する
export const formatEvaluationData = (
  existingEvaluation: ExistingEvaluation
) => {
  const result =
    existingEvaluation.evaluation_sections.reduce<FormattedEvaluation>(
      (acc, cur) => {
        acc[cur.section_type] = {
          ...formatCategoryScores(cur.evaluation_items),
          good_points: cur.good_points ?? [],
          improvement_points: cur.improvement_points ?? [],
        };
        return acc;
      },
      {
        basic: createEmptySectionData(),
        barista: createEmptySectionData(),
        cashier: createEmptySectionData(),
      }
    );

  return result;
};
