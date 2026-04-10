import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import { ExistingEvaluation } from '../../../../../../../types/evaluations';
import RateCircleChart from '@/components/evaluation/rate-circle-chart';
import CategoryRadarChart from '@/components/evaluation/category-radar-chart';

type OverallEvaluationProps = {
  targetEvaluation: ExistingEvaluation;
};

export default function OverallEvaluation({
  targetEvaluation,
}: OverallEvaluationProps) {
  const { rank, rate, skillRate, hospitalityRate, cleanlinessRate } =
    calcEvaluation(targetEvaluation.evaluation_sections);
  return (
    <div className="mt-15 max-w-200 mx-auto">
      <div className="flex flex-col space-y-10 lg:flex-row lg:gap-20 lg:space-y-0">
        <div className="flex-1">
          <RateCircleChart rate={rate} rank={rank} />
        </div>
        <div className="flex-1">
          <CategoryRadarChart
            skillRate={skillRate}
            hospitalityRate={hospitalityRate}
            cleanlinessRate={cleanlinessRate}
          />
        </div>
      </div>
    </div>
  );
}
