import { calcRank, calcRate } from '@/lib/utils/evaluation-calc';
import { ExistingEvaluation, Rank } from '../../../types/evaluations';

type CurrentEvaluation = {
  skillRate: number;
  hospitalityRate: number;
  cleanlinessRate: number;
  totalRate: number;
  rank: Rank;
  actionPlan: string | null;
  totalComment: string | null;
  futureVision: string | null;
};

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
