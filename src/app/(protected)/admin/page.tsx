import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProfileCard from '@/components/shared/profile-card';
import EvaluationPeriodList from './components/evaluation-period-list';
import AdminContainer from './components/admin-contaimer';
import EvaluationSection from './components/evaluation-section';

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) redirect('/login');

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('name, store_name, role ,email, avatar_url')
    .eq('id', user.id)
    .single();
  if (profileError || !profile) redirect('/login');

  const { data: evaluationPeriods, error: periodsError } = await supabase
    .from('evaluation_periods')
    .select('id, name');
  if (periodsError || !evaluationPeriods) return;

  return (
    <AdminContainer>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:min-w-80">
          <ProfileCard profile={profile} />
        </div>
        <EvaluationPeriodList evaluationPeriods={evaluationPeriods} />
      </div>
      <EvaluationSection evaluationPeriods={evaluationPeriods} label="評価" />
    </AdminContainer>
  );
}
