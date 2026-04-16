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

  CASHIER_CLEANLINESS,
  CASHIER_HOSPITALITY_ITEMS,
  CASHIER_SKILL_ITEMS,
} from '@/lib/constants/evaluation-items';

type CashierEvaluationProps = {
  targetEvaluation: ExistingEvaluation;
  targetEvaluationItems: EvaluationItem[];
};

export default function CashierEvaluation({
  targetEvaluation,
  targetEvaluationItems,
}: CashierEvaluationProps) {
  const { sectionRates } = calcEvaluation(targetEvaluation.evaluation_sections);
  const cashierSection = getSectionRate(sectionRates, 'cashier');

  if (!cashierSection) throw new Error('基本動作のデータが見つかりません');

  const categoryItems = formatCategoryRates(
    cashierSection.skillRate,
    cashierSection.hospitalityRate,
    cashierSection.cleanlinessRate
  );
  return (
    <SectionEvaluationLayout>
      <SectionEvaluationDetail
        rank={cashierSection.rank}
        rate={cashierSection.rate}
        categoryItems={categoryItems}
        skillRate={cashierSection.skillRate}
        hospitalityRate={cashierSection.hospitalityRate}
        cleanlinessRate={cashierSection.cleanlinessRate}
      />
      <SectionTab
        skillItems={CASHIER_SKILL_ITEMS}
        hospitalityItems={CASHIER_HOSPITALITY_ITEMS}
        cleanlinessItems={CASHIER_CLEANLINESS}
        targetEvaluationItems={targetEvaluationItems}
      />
    </SectionEvaluationLayout>
  );
}
