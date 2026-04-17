import {
  ExistingEvaluationSection,
  SectionType,
} from '../../../types/evaluations';

export const getEvaluationItemsBySection = (
  sections: ExistingEvaluationSection[],
  sectionType: SectionType
) => {
  const section = sections.find((s) => s.section_type === sectionType);
  if (!section) throw new Error(`${sectionType}のセクションが見つかりません`);
  return section.evaluation_items;
};
