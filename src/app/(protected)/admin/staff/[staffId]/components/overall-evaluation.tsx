import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import {
  ChartDataPoint,
  ExistingEvaluation,
} from '../../../../../../../types/evaluations';
import {
  formatCategoryRates,
  formatSectionRates,
} from '@/lib/utils/evaluation-format';
import EvaluationLineChart from '@/components/evaluation/evaluation-line-chart';
import SummaryComments from '@/components/evaluation/summary-comments';
import SectionEvaluationDetail from '@/components/evaluation/section-evaluation-detail';
import SectionEvaluationLayout from '@/components/evaluation/section-evaluation-layout';

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
    <SectionEvaluationLayout>
      <SectionEvaluationDetail
        rank={rank}
        rate={rate}
        skillRate={skillRate}
        hospitalityRate={hospitalityRate}
        cleanlinessRate={cleanlinessRate}
        sectionItems={sectionItems}
        categoryItems={categoryItems}
      />
      <EvaluationLineChart chartData={chartData} />
      <SummaryComments summaryComments={targetEvaluation} />
    </SectionEvaluationLayout>
  );
}
