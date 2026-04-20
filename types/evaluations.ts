import { SectionData } from '@/lib/validations/schemas';
import { Tables } from './supabase';

export type EvaluationItemConstant = Pick<
  Tables<'evaluation_items'>,
  'item_name' | 'category' | 'check_points'
>;

export type SectionType = 'basic' | 'barista' | 'cashier';

export type Category = 'skill' | 'hospitality' | 'cleanliness';

export type FormattedEvaluation = Record<SectionType, SectionData>;

export type EvaluationItem = Pick<
  Tables<'evaluation_items'>,
  'item_name' | 'score'
> & {
  category: Category;
};

export type ExistingEvaluationSection = Pick<
  Tables<'evaluation_sections'>,
  | 'good_points'
  | 'improvement_points'
  | 'skill_score'
  | 'skill_max'
  | 'hospitality_score'
  | 'hospitality_max'
  | 'cleanliness_score'
  | 'cleanliness_max'
> & {
  section_type: SectionType;
  evaluation_items: EvaluationItem[];
};

export type ExistingEvaluation = Pick<
  Tables<'evaluations'>,
  'id' | 'status' | 'action_plan' | 'total_comment' | 'future_vision'
> & { evaluation_sections: ExistingEvaluationSection[] };

export type ExistingEvaluationForStaffCard = Pick<
  Tables<'evaluations'>,
  'id' | 'staff_id'
> & {
  evaluation_sections: Pick<
    ExistingEvaluationSection,
    | 'section_type'
    | 'skill_score'
    | 'skill_max'
    | 'hospitality_score'
    | 'hospitality_max'
    | 'cleanliness_score'
    | 'cleanliness_max'
  >[];
};

export type EvaluationSectionScores = Pick<
  Tables<'evaluation_sections'>,
  | 'skill_score'
  | 'skill_max'
  | 'hospitality_score'
  | 'hospitality_max'
  | 'cleanliness_score'
  | 'cleanliness_max'
> & { section_type: SectionType };

export type EvaluationForChart = {
  evaluation_sections: EvaluationSectionScores[];
};

export type PeriodForChart = Pick<
  Tables<'evaluation_periods'>,
  'id' | 'name'
> & {
  evaluations: EvaluationForChart[];
};

export type ChartDataPoint = {
  name: string;
  value: number;
};

export type SummaryComment = Pick<
  Tables<'evaluations'>,
  'action_plan' | 'total_comment' | 'future_vision'
>;
