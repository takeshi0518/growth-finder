import { createClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/utils/requireStaff';

export default async function StaffPage() {
  const supabase = await createClient();

  const { orgId, profile } = await requireStaff(supabase);

  console.log(orgId, profile);

  return (
    <div>
      <div>Staff Page</div>
    </div>
  );
}
