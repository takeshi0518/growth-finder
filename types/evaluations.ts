import { SectionData } from '@/lib/validations/schemas';
import { Tables } from './supabase';

export type EvaluationItemConstant = Pick<
  Tables<'evaluation_items'>,
  'item_name' | 'category' | 'check_points'
>;

export type SectionType = 'basic' | 'barista' | 'cashier';

export type Category = 'skill' | 'hospitality' | 'cleanliness';

export type FormattedEvaluation = Record<SectionType, SectionData>;
