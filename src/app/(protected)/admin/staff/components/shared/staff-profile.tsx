import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Tables } from '../../../../../../../types/supabase';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

type Profile = Pick<
  Tables<'profiles'>,
  'name' | 'role' | 'store_name' | 'email' | 'avatar_url'
>;

type StaffProfile = {
  targetStaff: Profile;
  staffId: string;
};

export default function StaffProfile({ targetStaff, staffId }: StaffProfile) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.FileText className="w-5 h-5" />
          スタッフ詳細
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 overflow-hidden bg-card flex items-center justify-center">
                {targetStaff.avatar_url ? (
                  <Image
                    src={targetStaff.avatar_url}
                    alt={targetStaff.name}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                ) : (
                  <Icons.UserCircle className="w-16 h-16 text-muted-foreground" />
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-background border rounded-full px-2 py-0.5 text-xs"
              >
                編集
              </button>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>店舗名</Label>
            <p className="text-sm text-muted-foreground">
              {targetStaff.store_name}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input id="name" type="text" defaultValue={targetStaff.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" defaultValue={targetStaff.email} />
          </div>

          <div className="flex justify-around">
            <Button type="submit" size="lg" className="w-36">
              保存
            </Button>

            <Button asChild size="lg" className="w-36">
              <Link href={`/admin/staff/${staffId}/evaluations`}>評価</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
