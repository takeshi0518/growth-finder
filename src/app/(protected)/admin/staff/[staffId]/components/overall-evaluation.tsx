import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import {
  ChartDataPoint,
  ExistingEvaluation,
} from '../../../../../../../types/evaluations';
import RateCircleChart from '@/components/evaluation/rate-circle-chart';
import CategoryRadarChart from '@/components/evaluation/category-radar-chart';
import ProgressBar from '@/components/evaluation/progress-bar';
import {
  formatCategoryRates,
  formatSectionRates,
} from '@/lib/utils/evaluation-format';
import OverallScore from '@/components/evaluation/overall-score';
import EvaluationLineChart from '@/components/evaluation/evaluation-line-chart';

type OverallEvaluationProps = {
  targetEvaluation: ExistingEvaluation;
  chartData: ChartDataPoint[];
};

export default function OverallEvaluation({
  targetEvaluation,
  chartData,
}: OverallEvaluationProps) {
  const {
    rank,
    rate,
    skillRate,
    hospitalityRate,
    cleanlinessRate,
    sectionRates,
  } = calcEvaluation(targetEvaluation.evaluation_sections);

  const sectionItems = formatSectionRates(sectionRates);

  const categoryItems = formatCategoryRates(
    skillRate,
    hospitalityRate,
    cleanlinessRate
  );

  return (
    <div className="mt-15 max-w-200 mx-auto space-y-10">
      <OverallScore rank={rank} />
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
      <div className="flex flex-col lg:flex-row lg:gap-10 space-y-10 lg:space-y-0">
        <ProgressBar
          label="各セクション総合達成率"
          sectionRates={sectionItems}
        />
        <ProgressBar
          label="各カテゴリ総合達成率"
          sectionRates={categoryItems}
        />
      </div>
      <EvaluationLineChart chartData={chartData} />
    </div>
  );
}
