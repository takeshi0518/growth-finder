import { createClient } from '@/lib/supabase/server';
import AdminProfile from './components/admin-profile';
import { redirect } from 'next/navigation';
import EvaluationPeriodList from './components/evaluation-period-list';
import AdminContainer from './components/admin-contaimer';

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
        <AdminProfile profile={profile} />
        <EvaluationPeriodList evaluationPeriods={evaluationPeriods} />
      </div>
    </AdminContainer>
  );
}
