import Image from 'next/image';

import { Tables } from '../../../../../types/supabase';
import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

type Profile = Pick<
  Tables<'profiles'>,
  'name' | 'store_name' | 'role' | 'email' | 'avatar_url'
>;

type AdminProfile = {
  profile: Profile;
};

export default function AdminProfile({ profile }: AdminProfile) {
  return (
    <Card className="lg:min-w-80">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Icons.UserCircle className="w-5 h-5" />
            プロフィール
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full border-2 overflow-hidden bg-card flex items-center justify-center">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.name}
                width={100}
                height={100}
                className="object-cover"
              />
            ) : (
              <Icons.UserCircle className="w-16 h-16 text-muted-foreground" />
            )}
          </div>

          <div className="grid grid-cols-1 gap-y-3 text-sm">
            <div className="flex gap-2">
              <Label>店舗名</Label>
              <p className="text-muted-foreground">{profile.store_name}</p>
            </div>
            <div className="flex gap-2">
              <Label>役職</Label>
              <p className="text-muted-foreground">{profile.role}</p>
            </div>
            <div className="flex gap-2">
              <Label>名前</Label>
              <p className="text-muted-foreground">{profile.name}</p>
            </div>
            <div className="flex gap-2">
              <Label>メールアドレス</Label>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
