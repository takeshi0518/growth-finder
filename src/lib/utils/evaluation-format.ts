import {
  ChartDataPoint,
  PeriodForChart,
  SectionType,
} from '../../../types/evaluations';
import { calcRate } from './evaluation-calc';

const sectionLabel: Record<string, string> = {
  basic: '基本動作',
  barista: 'バリスタ',
  cashier: 'キャッシャー',
};

export type FormattedSectionRate = {
  label: string;
  rate: number;
};

export const formatSectionRates = (
  sectionRates: { sectionType: SectionType; rate: number }[]
) =>
  sectionRates.map<FormattedSectionRate>((section) => ({
    label: sectionLabel[section.sectionType],
    rate: section.rate,
  }));

export const formatCategoryRates = (
  skillRate: number,
  hospitalityRate: number,
  cleanlinessRate: number
): FormattedSectionRate[] => [
  { label: 'スキル', rate: skillRate },
  { label: 'ホスピタリティ', rate: hospitalityRate },
  { label: 'クレンリネス', rate: cleanlinessRate },
];

export const formatChartData = (periods: PeriodForChart[]) =>
  periods.map<ChartDataPoint>((period) => ({
    name: period.name,
    value: calcRate(period.evaluations[0].evaluation_sections).totalRate,
  }));
