import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import { ExistingEvaluation } from '../../../../../../../types/evaluations';
import RateCircleChart from '@/components/evaluation/rate-circle-chart';
import CategoryRadarChart from '@/components/evaluation/category-radar-chart';
import ProgressBar from '@/components/evaluation/progress-bar';

type OverallEvaluationProps = {
  targetEvaluation: ExistingEvaluation;
};

export default function OverallEvaluation({
  targetEvaluation,
}: OverallEvaluationProps) {
  const {
    rank,
    rate,
    skillRate,
    hospitalityRate,
    cleanlinessRate,
    sectionRates,
  } = calcEvaluation(targetEvaluation.evaluation_sections);
  return (
    <div className="mt-15 max-w-200 mx-auto">
      <div className="flex items-center gap-5 mb-10 justify-center">
        <div className="text-2xl sm:text-3xl">総合評価</div>
        <div className="text-3xl sm:text-4xl">{rank}</div>
      </div>
      <div className="flex flex-col space-y-10 lg:flex-row lg:gap-20 lg:space-y-0">
        <div className="flex-1">
          <RateCircleChart rate={rate} />
        </div>
        <div className="flex-1">
          <CategoryRadarChart
            skillRate={skillRate}
            hospitalityRate={hospitalityRate}
            cleanlinessRate={cleanlinessRate}
          />
        </div>
      </div>
      <div>
        <ProgressBar
          label="各セクション総合達成率"
          sectionRates={sectionRates}
        />
      </div>
    </div>
  );
}
