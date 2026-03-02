'use client';

import { useState } from 'react';

import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { deleteStaff } from '../actions';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils/error-message';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import StaffCardMenu from './staff-card-menu';
import { Staff } from '../../../../../../types/staff';

type StaffCardProps = {
  staff: Staff;
};

export default function StaffCard({ staff }: StaffCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteStaff(staff.id);
      toast.success('スタッフを削除しました');
    } catch (error) {
      toast.error('スタッフの削除に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Card className="relative">
      <CardContent className="pb-4">
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <Icons.EllipsisVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <StaffCardMenu />
            </DropdownMenuContent>
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {staff.name}を削除しますか？
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は取り消せません。スタッフの全データが完全に削除されます。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive! hover:bg-destructive/90!"
                    onClick={handleDelete}
                  >
                    削除する
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenu>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center overflow-hidden shrink-0">
              {staff.avatar_url ? (
                <Image
                  src={staff.avatar_url}
                  alt={staff.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <Icons.UserCircle className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <span className="font-medium text-sm">{staff.name}</span>
          </div>
        </div>

        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <p>役職 {staff.role}</p>
          <p>店舗名 {staff.store_name}</p>
        </div>
        {/* 現在の評価はダミー */}
        <div className="mt-3 pt-3 border-t space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            現在の評価
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground mt-1 bg-primary/10 rounded-xl p-2">
              総合評価: B
            </span>
            <span className="text-xs text-muted-foreground mt-1 bg-primary/10 rounded-xl p-2">
              総合達成率78%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
