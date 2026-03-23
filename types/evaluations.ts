import { Tables } from "./supabase";

export type EvaluationItemConstant = Pick<
  Tables<'evaluation_items'>,
  'item_name' | 'category' | 'check_points'
>;
