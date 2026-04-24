import ProfileCard from '@/components/shared/profile-card';
import { createClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/utils/requireStaff';

export default async function StaffPage() {
  const supabase = await createClient();

  const { profile } = await requireStaff(supabase);

  return (
    <div className="mt-20 max-w-7xl mx-auto w-full py-6 px-4 space-y-6">
      <ProfileCard profile={profile} />
    </div>
  );
}
