import BackPageLink from '@/components/shared/back-page-link';
import StaffProfile from '../components/staff-profile';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import EvaluationSection from '../../components/evaluation-section';
import AdminContainer from '../../components/admin-contaimer';

type StaffDetailPageProps = {
  params: { staffId: string };
};

export default async function StaffDetailPage({
  params,
}: StaffDetailPageProps) {
  const { staffId } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: targetStaff } = await supabase
    .from('profiles')
    .select('name, store_name, role, email, avatar_url')
    .eq('id', staffId)
    .single();

  if (!targetStaff) redirect('/admin/staff');

  return (
    <AdminContainer>
      <BackPageLink href="/admin/staff" label="スタッフ一覧に戻る" />
      <StaffProfile targetStaff={targetStaff} staffId={staffId} />
      <EvaluationSection label="評価" />
    </AdminContainer>
  );
}
