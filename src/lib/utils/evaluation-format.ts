import { SectionType } from '../../../types/evaluations';

const sectionLabel: Record<string, string> = {
  basic: '基本動作',
  barista: 'バリスタ',
  cashier: 'キャッシャー',
};

export const formatSectionRates = (
  sectionRates: { sectionType: SectionType; rate: number }[]
) =>
  sectionRates.map((section) => ({
    label: sectionLabel[section.sectionType],
    rate: section.rate,
  }));

export const formatCategoryRates = (
  skillRate: number,
  hospitalityRate: number,
  cleanlinessRate: number
) => [
  { label: 'スキル', rate: skillRate },
  { label: 'ホスピタリティ', rate: hospitalityRate },
  { label: 'クレンリネス', rate: cleanlinessRate },
];
