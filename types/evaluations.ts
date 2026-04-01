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
  'item_name' | 'category' | 'score'
>;

export type ExistingEvaluationSection = Pick<
  Tables<'evaluation_sections'>,
  'section_type' | 'good_points' | 'improvement_points'
> & {
  evaluation_items: EvaluationItem[];
};

export type ExistingEvaluation = Pick<
  Tables<'evaluations'>,
  'id' | 'action_plan' | 'total_comment' | 'future_vision'
> & { evaluation_sections: ExistingEvaluationSection[] };
