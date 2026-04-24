import ProfileCard from '@/components/shared/profile-card';
import { createClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/utils/requireStaff';
import PeriodSelector from './components/period-selector';

export default async function StaffPage() {
  const supabase = await createClient();

  const { profile, orgId } = await requireStaff(supabase);

  const { data: evaluationPeriiods, error: periodError } = await supabase
    .from('evaluation_periods')
    .select('id, name')
    .eq('organization_id', orgId);
  if (periodError || !evaluationPeriiods) return;

  return (
    <div className="mt-20 max-w-7xl mx-auto w-full py-6 px-4 space-y-6">
      <ProfileCard profile={profile} />
      <PeriodSelector evaluationPeriods={evaluationPeriiods} />
    </div>
  );
}
