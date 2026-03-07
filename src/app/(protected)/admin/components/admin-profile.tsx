import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function AdminProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Icons.Pencil className="w-5 h-5" />
            プロフィール
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full border-2 overflow-hidden bg-card flex items-center justify-center">
            {/* {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={targetStaff.name}
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    ) : (
                      <Icons.UserCircle className="w-16 h-16 text-muted-foreground" />
                    )} */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div className="flex gap-2">
              <Label>店舗名</Label>
              <p className="text-muted-foreground">GoodCafe</p>
            </div>
            <div className="flex gap-2">
              <Label>役職</Label>
              <p className="text-muted-foreground">admin</p>
            </div>
            <div className="flex gap-2">
              <Label>名前</Label>
              <p className="text-muted-foreground">山田太郎</p>
            </div>
            <div className="flex gap-2">
              <Label>メールアドレス</Label>
              <p className="text-muted-foreground">taro@gmail.com</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
