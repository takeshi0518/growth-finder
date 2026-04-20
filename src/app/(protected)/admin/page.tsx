import { createClient } from '@/lib/supabase/server';
import ProfileCard from '@/components/shared/profile-card';
import EvaluationPeriodList from './components/evaluation-period-list';
import AdminContainer from './components/admin-contaimer';
import EvaluationSection from './components/evaluation-section';
import { requireAdmin } from '@/lib/utils/requireAdmin';

export default async function AdminPage() {
  const supabase = await createClient();

  const { orgId, profile } = await requireAdmin(supabase);

  const { data: evaluationPeriods, error: periodsError } = await supabase
    .from('evaluation_periods')
    .select('id, name, is_current')
    .eq('organization_id', orgId);

  if (periodsError || !evaluationPeriods) return;

  return (
    <AdminContainer>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:min-w-80">
          <ProfileCard profile={profile} />
        </div>
        <EvaluationPeriodList evaluationPeriods={evaluationPeriods} />
      </div>
      <EvaluationSection
        evaluationPeriods={evaluationPeriods}
        label="評価"
      />
    </AdminContainer>
  );
}
