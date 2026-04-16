import {
  EvaluationItem,
  ExistingEvaluation,
} from '../../../../../../../types/evaluations';
import { calcEvaluation, getSectionRate } from '@/lib/utils/evaluation-calc';
import SectionEvaluationDetail from '@/components/evaluation/section-evaluation-detail';
import { formatCategoryRates } from '@/lib/utils/evaluation-format';
import SectionEvaluationLayout from '@/components/evaluation/section-evaluation-layout';
import SectionTab from '@/components/evaluation/section-tab';
import {
  BARISTA_CLEANLINESS,
  BARISTA_HOSPITALITY_ITEMS,
  BARISTA_SKILL_ITEMS,
} from '@/lib/constants/evaluation-items';

type BaristaEvaluationProps = {
  targetEvaluation: ExistingEvaluation;
  targetEvaluationItems: EvaluationItem[];
};

export default function BaristaEvaluation({
  targetEvaluation,
  targetEvaluationItems,
}: BaristaEvaluationProps) {
  const { sectionRates } = calcEvaluation(targetEvaluation.evaluation_sections);
  const baristaSection = getSectionRate(sectionRates, 'barista');

  if (!baristaSection) throw new Error('基本動作のデータが見つかりません');

  const categoryItems = formatCategoryRates(
    baristaSection.skillRate,
    baristaSection.hospitalityRate,
    baristaSection.cleanlinessRate
  );
  return (
    <SectionEvaluationLayout>
      <SectionEvaluationDetail
        rank={baristaSection.rank}
        rate={baristaSection.rate}
        categoryItems={categoryItems}
        skillRate={baristaSection.skillRate}
        hospitalityRate={baristaSection.hospitalityRate}
        cleanlinessRate={baristaSection.cleanlinessRate}
      />
      <SectionTab
        skillItems={BARISTA_SKILL_ITEMS}
        hospitalityItems={BARISTA_HOSPITALITY_ITEMS}
        cleanlinessItems={BARISTA_CLEANLINESS}
        targetEvaluationItems={targetEvaluationItems}
      />
    </SectionEvaluationLayout>
  );
}
