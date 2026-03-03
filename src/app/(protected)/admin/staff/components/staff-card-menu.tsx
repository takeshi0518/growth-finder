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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type StaffCardMenuProps = {
  staff: Staff;
};

type DeleteDialogProps = {
  staffName: string;
  staffId: string;
  isDeleteOpen: boolean;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
};

type EditDialogProps = {
  staffId: string;
  staffEmail: string;
  staffName: string;
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
};

type EditPasswordDialogProps = {
  staffId: string;
  isEditPasswordOpen: boolean;
  setIsEditPasswordOpen: Dispatch<SetStateAction<boolean>>;
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

function EditDialog({
  staffId,
  staffName,
  staffEmail,
  isEditOpen,
  setIsEditOpen,
}: EditDialogProps) {
  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            <div className="flex items-center">
              <Icons.Pencil className="h-4 w-4 mr-2" />
              <span>スタッフを編集</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input id="name" type="text" defaultValue={staffName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" defaultValue={staffEmail} />
          </div>
          <div className="flex justify-center">
            <Button type="submit" size="lg" className="w-full sm:w-48">
              保存
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditPasswordDialog({
  staffId,
  isEditPasswordOpen,
  setIsEditPasswordOpen,
}: EditPasswordDialogProps) {
  return (
    <Dialog open={isEditPasswordOpen} onOpenChange={setIsEditPasswordOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            <div className="flex items-center">
              <Icons.KeyRound className="h-4 w-4 mr-2" />
              <span>パスワードを変更</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">パスワード</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">確認パスワード</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="flex justify-center">
            <Button type="submit" size="lg" className="w-full sm:w-48">
              保存
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function StaffCardMenu({ staff }: StaffCardMenuProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);

  return (
    <>
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
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setIsEditOpen(true)}
          >
            <Icons.Pencil className="mr-2 size-4" />
            編集
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setIsEditPasswordOpen(true)}
          >
            <Icons.KeyRound className="mr-2 size-4" />
            パスワード変更
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setIsDeleteOpen(true)}
            className="cursor-pointer text-destructive"
          >
            <Icons.Trash2 className="mr-2 size-4" />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDialog
        staffName={staff.name}
        staffId={staff.id}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
      />

      <EditDialog
        staffId={staff.id}
        staffName={staff.name}
        staffEmail={staff.email}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
      />

      <EditPasswordDialog
        staffId={staff.id}
        isEditPasswordOpen={isEditPasswordOpen}
        setIsEditPasswordOpen={setIsEditPasswordOpen}
      />
    </>
  );
}
