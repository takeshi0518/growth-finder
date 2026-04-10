import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import { ExistingEvaluation } from '../../../../../../../types/evaluations';
import RateCircleChart from '@/components/evaluation/rate-circle-chart';

type OverallEvaluationProps = {
  targetEvaluation: ExistingEvaluation;
};

export default function OverallEvaluation({
  targetEvaluation,
}: OverallEvaluationProps) {
  const { rank, rate } = calcEvaluation(targetEvaluation.evaluation_sections);
  return (
    <div className="mt-10 max-w-200 mx-auto">
      <RateCircleChart rate={rate} rank={rank}/>
    </div>
  );
}
