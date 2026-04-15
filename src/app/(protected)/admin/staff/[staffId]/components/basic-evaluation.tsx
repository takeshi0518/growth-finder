import { ExistingEvaluation } from '../../../../../../../types/evaluations';
import { calcEvaluation, getSectionRate } from '@/lib/utils/evaluation-calc';
import SectionEvaluationDetail from '@/components/evaluation/section-evaluation-detail';
import { formatCategoryRates } from '@/lib/utils/evaluation-format';

type BasicEvaluationProps = {
  targetEvaluation: ExistingEvaluation;
};

export default function BasicEvaluation({
  targetEvaluation,
}: BasicEvaluationProps) {
  const { sectionRates } = calcEvaluation(targetEvaluation.evaluation_sections);
  const basicSection = getSectionRate(sectionRates, 'basic');

  if (!basicSection) throw new Error('基本動作のデータが見つかりません');

  const categoryItems = formatCategoryRates(
    basicSection.skillRate,
    basicSection.hospitalityRate,
    basicSection.cleanlinessRate
  );
  return (
    <div className="mt-15 max-w-200 mx-auto space-y-10">
      <SectionEvaluationDetail
        rank={basicSection.rank}
        rate={basicSection.rate}
        categoryItems={categoryItems}
        skillRate={basicSection.skillRate}
        hospitalityRate={basicSection.hospitalityRate}
        cleanlinessRate={basicSection.cleanlinessRate}
      />
    </div>
  );
}
