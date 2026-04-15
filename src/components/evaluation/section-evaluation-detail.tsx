import { FormattedSectionRate } from '@/lib/utils/evaluation-format';
import CategoryRadarChart from './category-radar-chart';
import OverallScore from './overall-score';
import ProgressBar from './progress-bar';
import RateCircleChart from './rate-circle-chart';

type SectionEvaluationDetailProps = {
  rank: string;
  rate: number;
  skillRate: number;
  hospitalityRate: number;
  cleanlinessRate: number;
  sectionItems: FormattedSectionRate[];
  categoryItems: FormattedSectionRate[];
};

export default function SectionEvaluationDetail({
  rank,
  rate,
  skillRate,
  hospitalityRate,
  cleanlinessRate,
  sectionItems,
  categoryItems,
}: SectionEvaluationDetailProps) {
  return (
    <>
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
    </>
  );
}
