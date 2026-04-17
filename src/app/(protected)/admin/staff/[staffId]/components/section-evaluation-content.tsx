import {
  EvaluationItem,
  ExistingEvaluation,
  SectionType,
} from '../../../../../../../types/evaluations';
import { calcEvaluation } from '@/lib/utils/evaluation-calc';
import SectionEvaluationDetail from '@/components/evaluation/section-evaluation-detail';
import { formatCategoryRates } from '@/lib/utils/evaluation-format';
import SectionEvaluationLayout from '@/components/evaluation/section-evaluation-layout';
import SectionTab from '@/components/evaluation/section-tab';
import { SECTION_ITEMS } from '@/lib/constants/evaluation-items';
import { getSectionStats } from '@/lib/utils/evaluation-utils';

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
  const currentSection = getSectionStats(sectionRates, sectionType);

  const categoryItems = formatCategoryRates(
    currentSection.skillRate,
    currentSection.hospitalityRate,
    currentSection.cleanlinessRate
  );
  return (
    <SectionEvaluationLayout>
      <SectionEvaluationDetail
        rank={currentSection.rank}
        rate={currentSection.rate}
        categoryItems={categoryItems}
        skillRate={currentSection.skillRate}
        hospitalityRate={currentSection.hospitalityRate}
        cleanlinessRate={currentSection.cleanlinessRate}
      />
      <SectionTab
        items={SECTION_ITEMS[sectionType]}
        targetEvaluationItems={targetEvaluationItems}
      />
    </SectionEvaluationLayout>
  );
}
