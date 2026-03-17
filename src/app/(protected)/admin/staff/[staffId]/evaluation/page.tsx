import BackPageLink from '@/components/shared/back-page-link';
import AdminContainer from '../../../components/admin-contaimer';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import ProfileCard from '@/components/shared/profile-card';
import EvaluationForm from './components/evaluation-form';

type EvaluationPageProps = {
  params: { staffId: string };
};

export default async function EvaluationPage({ params }: EvaluationPageProps) {
  const { staffId } = await params;

  const supabase = await createClient();

  const { orgId } = await requireAdmin(supabase);

  const { data: staffProfile, error } = await supabase
    .from('profiles')
    .select('name, store_name, role, email, avatar_url')
    .eq('organization_id', orgId)
    .eq('id', staffId)
    .single();
  if (error) throw new Error('スタッフ情報の取得に失敗しました');

  return (
    <AdminContainer>
      <BackPageLink href="/admin/staff" label="スタッフ一覧へ戻る" />
      <ProfileCard profile={staffProfile} />
      <EvaluationForm />
    </AdminContainer>
  );
}
