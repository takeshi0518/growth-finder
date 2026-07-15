import { SupabaseClient } from '@supabase/supabase-js';
import { EvaluationTrend, PreviousEvaluation } from './types';
import { calcRank, calcRate, SectionScores } from '@/lib/utils/evaluation-calc';
import { average, judgeDirection } from './trend';

type PreviousEvaluationRow = {
  action_plan: string | null;
  total_comment: string | null;
  future_vision: string | null;
  evaluation_periods: { name: string }; //Supabaseから返却されるデータは単一で実態に合わせる
  evaluation_sections: SectionScores[];
};

type TrendEvaluationRow = {
  evaluation_periods: { name: string };
  evaluation_sections: SectionScores[];
};

export async function getPreviousEvaluation(
  supabase: SupabaseClient,
  staffId: string,
  orgId: string
): Promise<PreviousEvaluation | null> {
  const { data, error } = await supabase
    .from('evaluations')
    .select(
      `
      action_plan,
      total_comment,
      future_vision,
      evaluation_periods ( name ),
      evaluation_sections (
        section_type,
        skill_score, skill_max,
        hospitality_score, hospitality_max,
        cleanliness_score, cleanliness_max
      )
      `
    )
    .eq('staff_id', staffId)
    .eq('organization_id', orgId)
    .eq('status', 'completed')
    .order('evaluation_date', { ascending: false })
    .limit(2);

  if (error) throw error;

  // Supabase の生成型は evaluation_periods を配列 { name }[] と推論するが、
  // evaluation → evaluation_period は多対1（period_id は NOT NULL）のため
  // 実行時は単一オブジェクト { name } で返ることを確認済み。
  // 生成型と実態がズレているため、実態に合わせた型へ unknown 経由で変換する。
  const rows = data as unknown as PreviousEvaluationRow[] | null;

  // data[0] = 今回, data[1] = 前回。前回が無ければ null
  const previous = rows?.[1];
  if (!previous) return null;

  const { skillRate, hospitalityRate, cleanlinessRate, totalRate } = calcRate(
    previous.evaluation_sections
  );

  return {
    periodName: previous.evaluation_periods.name,
    skillRate,
    hospitalityRate,
    cleanlinessRate,
    totalRate,
    rank: calcRank(totalRate),
    actionPlan: previous.action_plan,
    totalComment: previous.total_comment,
    futureVision: previous.future_vision,
  };
}

export async function getEvaluationTrend(
  supabase: SupabaseClient,
  staffId: string,
  orgId: string,
): Promise<EvaluationTrend | null> {
  const { data, error } = await supabase
    .from('evaluations')
    .select(
      `
    evaluation_periods ( name ),
    evaluation_sections (
      section_type,
      skill_score, skill_max,
      hospitality_score, hospitality_max,
      cleanliness_score, cleanliness_max
    )
      `
    )
    .eq('staff_id', staffId)
    .eq('organization_id', orgId)
    .eq('status', 'completed')
    .order('created_at', { ascending: true });

  if (error) throw error;

  const rows = data as unknown as TrendEvaluationRow[] | null;

  if (!rows || rows.length === 0) return null;

  const rateHistory = rows.map((r) => calcRate(r.evaluation_sections));
  const skillRates = rateHistory.map((r) => r.skillRate);
  const hospitalityRates = rateHistory.map((r) => r.hospitalityRate);
  const cleanlinessRates = rateHistory.map((r) => r.cleanlinessRate);

  return {
    periodStart: rows[0].evaluation_periods.name,
    periodEnd: rows[rows.length - 1].evaluation_periods.name,
    evaluationCount: rows.length,
    skill: {
      averageRate: average(skillRates),
      direction: judgeDirection(skillRates),
    },
    hospitality: {
      averageRate: average(hospitalityRates),
      direction: judgeDirection(hospitalityRates),
    },
    cleanliness: {
      averageRate: average(cleanlinessRates),
      direction: judgeDirection(cleanlinessRates),
    },
  };
}
