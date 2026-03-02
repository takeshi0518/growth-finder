'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icon/icons';
import { Staff } from '../../../../../../types/staff';
import { deleteStaff } from '../actions';
import { getErrorMessage } from '@/lib/utils/error-message';

type StaffCardMenuProps = {
  staff: Staff;
};

type DeleteDialogProps = {
  staffName: string;
  staffId: string;
  isDeleteOpen: boolean;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
};

function DeleteDialog({
  staffName,
  staffId,
  isDeleteOpen,
  setIsDeleteOpen,
}: DeleteDialogProps) {
  const handleDelete = async () => {
    try {
      await deleteStaff(staffId);
      toast.success('スタッフを削除しました');
    } catch (error) {
      toast.error('スタッフの削除に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };
  return (
    <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{staffName}を削除しますか？</AlertDialogTitle>
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
  );
}

export default function StaffCardMenu({ staff }: StaffCardMenuProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <Icons.EllipsisVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer">
          <Icons.FileText className="mr-2 size-4" />
          詳細
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Icons.ClipboardList className="mr-2 size-4" />
          評価
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Icons.Pencil className="mr-2 size-4" />
          編集
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => setIsDeleteOpen(true)}
          className="cursor-pointer text-destructive"
        >
          <Icons.Trash2 className="mr-2 size-4" />
          削除
        </DropdownMenuItem>
      </DropdownMenuContent>

      <DeleteDialog
        staffName={staff.name}
        staffId={staff.id}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
      />
    </DropdownMenu>
  );
}
