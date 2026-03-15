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
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, store_name, role ,email, avatar_url')
    .eq('id', user.id)
    .single();
  if (!profile) redirect('/login');

  const { data: evaluationPeriods } = await supabase
    .from('evaluation_periods')
    .select('id, name');
  if (!evaluationPeriods) return;

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
