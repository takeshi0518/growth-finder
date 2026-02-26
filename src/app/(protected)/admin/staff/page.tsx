import Link from 'next/link';
import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function StaffManagementPage() {
  return (
    <div className="mt-20 md:mt-0 max-w-7xl mx-auto w-full py-6 px-4 space-y-6">
      <Link
        href="/admin"
        className="w-fit flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Icons.Undo2 />
        <span>ダッシュボードへ戻る</span>
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icons.Users className="w-5 h-5" />
            スタッフ管理
          </CardTitle>
          <Button>
            <Icons.UserPlus className="w-4 h-4 mr-2" />
            スタッフ追加
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">合計:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
