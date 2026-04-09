import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import { ExistingEvaluation } from '../../../../../../../types/evaluations';

type OverallEvaluationProps = {
  targetEvaluation: ExistingEvaluation;
};

export default function OverallEvaluation({
  targetEvaluation,
}: OverallEvaluationProps) {
  const { rank } = calcEvaluation(targetEvaluation.evaluation_sections);
  return (
    <div className="mt-10 max-w-200 mx-auto">
      <div className="flex items-center gap-5 justify-center">
        <div className="text-4xl">総合評価</div>
        <div className="text-5xl">{rank}</div>
      </div>
    </div>
  );
}
