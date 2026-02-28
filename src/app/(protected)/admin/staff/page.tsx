import Link from 'next/link';
import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StaffList from './components/staff-list';
import StaffAddDialog from './components/staff-add-dialog';

export const dummyStaffs = [
  {
    id: '1',
    name: '山田太郎',
    role: 'スタッフ',
    store_name: 'example店',
    avatar_url: null,
  },
  {
    id: '2',
    name: '鈴木花子',
    role: 'スタッフ',
    store_name: 'example店',
    avatar_url: null,
  },
  {
    id: '3',
    name: '佐藤次郎',
    role: 'スタッフ',
    store_name: 'example店',
    avatar_url: null,
  },
  {
    id: '4',
    name: '田中三郎',
    role: 'スタッフ',
    store_name: 'example店',
    avatar_url: null,
  },
];

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
          <StaffAddDialog />
        </CardHeader>

        <CardContent className="space-y-6">
          <StaffList staffs={dummyStaffs} />
        </CardContent>
      </Card>
    </div>
  );
}
