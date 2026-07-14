import { calcRank, calcRate } from '@/lib/utils/evaluation-calc';
import { ExistingEvaluation, Rank } from '../../../types/evaluations';
import { CurrentEvaluation } from './types';

export function formatCurrentEvaluation(
  evaluation: ExistingEvaluation
): CurrentEvaluation {
  const { skillRate, hospitalityRate, cleanlinessRate, totalRate } = calcRate(
    evaluation.evaluation_sections
  );

  return {
    skillRate,
    hospitalityRate,
    cleanlinessRate,
    totalRate,
    rank: calcRank(totalRate),
    actionPlan: evaluation.action_plan,
    totalComment: evaluation.total_comment,
    futureVision: evaluation.future_vision,
  };
}
