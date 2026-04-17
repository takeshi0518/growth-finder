import {
  Category,
  EvaluationItem,
  ExistingEvaluationSection,
  SectionType,
} from '../../../types/evaluations';

export const getSectionStats = (
  sectionRates: {
    sectionType: SectionType;
    rate: number;
    rank: string;
    skillRate: number;
    hospitalityRate: number;
    cleanlinessRate: number;
  }[],
  type: SectionType
) => {
  const section = sectionRates.find(
    (sectionRate) => sectionRate.sectionType === type
  );
  if (!section) throw new Error(`${type}のセクションが見つかりません`);

  return section;
};

export const getEvaluationItemsBySection = (
  sections: ExistingEvaluationSection[],
  sectionType: SectionType
) => {
  const section = sections.find((s) => s.section_type === sectionType);
  if (!section) throw new Error(`${sectionType}のセクションが見つかりません`);
  return section.evaluation_items;
};

export const filterEvaluationItemsByCategory = (
  evaluationItems: EvaluationItem[],
  section: Category
) => {
  return evaluationItems.filter((items) => items.category === section);
};
