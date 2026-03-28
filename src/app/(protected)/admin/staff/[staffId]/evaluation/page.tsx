import BackPageLink from '@/components/shared/back-page-link';
import AdminContainer from '../../../components/admin-contaimer';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/utils/requireAdmin';
import ProfileCard from '@/components/shared/profile-card';
import EvaluationForm from './components/evaluation-form';
import {
  BARISTA_CLEANLINESS,
  BARISTA_HOSPITALITY_ITEMS,
  BARISTA_SKILL_ITEMS,
  BASIC_CLEANLINESS_ITEMS,
  BASIC_HOSPITALITY_ITEMS,
  BASIC_SKILL_ITEMS,
  CASHIER_CLEANLINESS,
  CASHIER_HOSPITALITY_ITEMS,
  CASHIER_SKILL_ITEMS,
} from '@/lib/constants/evaluation-items';

type EvaluationPageProps = {
  params: { staffId: string };
  searchParams: { periodId: string };
};

export default async function EvaluationPage({
  params,
  searchParams,
}: EvaluationPageProps) {
  const { staffId } = await params;
  const { periodId } = await searchParams;

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
      <EvaluationForm
        staffId={staffId}
        periodId={periodId}
        basicSkillItems={BASIC_SKILL_ITEMS}
        basicHospitalityItems={BASIC_HOSPITALITY_ITEMS}
        basicCleanlinessItems={BASIC_CLEANLINESS_ITEMS}
        cashierSkillItems={CASHIER_SKILL_ITEMS}
        cashierHospitalityItems={CASHIER_HOSPITALITY_ITEMS}
        cashierCleanlinessItems={CASHIER_CLEANLINESS}
        baristaSkillItems={BARISTA_SKILL_ITEMS}
        baristaHospitalityItems={BARISTA_HOSPITALITY_ITEMS}
        baristaCleanliness={BARISTA_CLEANLINESS}
      />
    </AdminContainer>
  );
}
