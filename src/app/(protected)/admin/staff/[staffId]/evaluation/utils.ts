import { SectionData } from '@/lib/validations/schemas';
import {
  Category,
  EvaluationItem,
  ExistingEvaluation,
  FormattedEvaluation,
  SectionType,
} from '../../../../../../../types/evaluations';

//evaluation_itemsをcategoryごとに{item_name: score}の形に整形する
export const formatCategoryScores = (items: EvaluationItem[]) =>
  items.reduce((acc, cur) => {
    if (!acc[cur.category as Category]) acc[cur.category as Category] = {};
    acc[cur.category as Category][cur.item_name] = cur.score ?? 0;
    return acc;
  }, {} as SectionData);

//既存評価データをEvaluationFormのdefaultValues形式に整形する
export const formatEvaluationData = (
  existingEvaluation: ExistingEvaluation
) => {
  const result = existingEvaluation.evaluation_sections.reduce((acc, cur) => {
    acc[cur.section_type as SectionType] = {
      ...formatCategoryScores(cur.evaluation_items),
      good_points: (cur.good_points ?? []) as string[],
      improvement_points: (cur.improvement_points ?? []) as string[],
    };
    return acc;
  }, {} as FormattedEvaluation);

  return result;
};
