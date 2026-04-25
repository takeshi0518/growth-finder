import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import SectionEvaluationDetail from '@/components/evaluation/section-evaluation-detail';
import { formatCategoryRates } from '@/lib/utils/evaluation-format';
import SectionEvaluationLayout from '@/components/evaluation/section-evaluation-layout';
import SectionTab from '@/components/evaluation/section-tab';
import { SECTION_ITEMS } from '@/lib/constants/evaluation-items';
import { getSectionStats } from '@/lib/utils/evaluation-utils';
import {
  EvaluationItem,
  ExistingEvaluation,
  SectionType,
} from '../../../types/evaluations';

type SectionEvaluationContentProps = {
  targetEvaluation: ExistingEvaluation;
  targetEvaluationItems: EvaluationItem[];
  sectionType: SectionType;
};

export default function SectionEvaluationContent({
  targetEvaluation,
  targetEvaluationItems,
  sectionType,
}: SectionEvaluationContentProps) {
  const { sectionRates } = calcEvaluation(targetEvaluation.evaluation_sections);
  const sectionStats = getSectionStats(sectionRates, sectionType);

  const categoryItems = formatCategoryRates(
    sectionStats.skillRate,
    sectionStats.hospitalityRate,
    sectionStats.cleanlinessRate
  );
  return (
    <SectionEvaluationLayout>
      <SectionEvaluationDetail
        rank={sectionStats.rank}
        rate={sectionStats.rate}
        categoryItems={categoryItems}
        skillRate={sectionStats.skillRate}
        hospitalityRate={sectionStats.hospitalityRate}
        cleanlinessRate={sectionStats.cleanlinessRate}
      />
      <SectionTab
        items={SECTION_ITEMS[sectionType]}
        targetEvaluationItems={targetEvaluationItems}
      />
    </SectionEvaluationLayout>
  );
}
