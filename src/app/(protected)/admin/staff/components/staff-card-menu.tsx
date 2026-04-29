'use client';

import { Dispatch, SetStateAction, useRef, useState } from 'react';
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
import { deleteStaff, editStaff, editStaffPassword } from '../actions';
import { getErrorMessage } from '@/lib/utils/error-message';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import {
  EditStaffInput,
  EditStaffPasswordInput,
  editStaffPasswordSchema,
  editStaffSchema,
} from '@/lib/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import LoaderCircleIcon from '@/components/shared/loader-circle';
import Image from 'next/image';
import {
  AVATAR_ALLOWED_TYPES,
  AVATAR_MAX_SIZE,
  AVATAR_MAX_SIZE_LABEL,
} from '@/lib/constants/upload';
import { uploadStaffAvatar } from '@/lib/utils/upload';
import Link from 'next/link';
import { Tables } from '../../../../../../types/supabase';
import DemoRestricted from '@/components/shared/demo-restricted';

type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id'> | null;

type StaffCardMenuProps = {
  isDemo: boolean;
  staff: Staff;
  selectedPeriod: EvaluationPeriod;
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
  staffAvatarUrl: string | null;
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
  staffAvatarUrl,
  isEditOpen,
  setIsEditOpen,
}: EditDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(staffAvatarUrl);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditStaffInput>({
    resolver: zodResolver(editStaffSchema),
    defaultValues: {
      name: staffName ?? '',
      email: staffEmail ?? '',
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!AVATAR_ALLOWED_TYPES.includes(file.type)) {
      toast.error('jpeg・png・webp形式の画像を選択してください');
      return;
    }

    if (file.size > AVATAR_MAX_SIZE) {
      toast.error(`ファイルサイズは${AVATAR_MAX_SIZE_LABEL}以下にしてください`);
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const result = await uploadStaffAvatar(formData, staffId);
      setAvatarUrl(result.publicUrl);
      toast.success('画像をアップロードしました');
    } catch (error) {
      toast.error('画像のアップロードに失敗しました', {
        description: getErrorMessage(error),
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: EditStaffInput) => {
    try {
      await editStaff(data, staffId);
      toast.success('スタッフの更新に成功しました');
      setIsEditOpen(false);
    } catch (error) {
      toast.error('スタッフの更新に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

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
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 overflow-hidden bg-card flex items-center justify-center">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={staffName}
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
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 bg-background border rounded-full px-2 py-0.5 text-xs"
              >
                {isUploading ? '...' : '編集'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {`jpeg・png・webp形式 ${AVATAR_MAX_SIZE_LABEL}以下`}
          </p>

          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input id="name" type="text" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            )}
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-48"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoaderCircleIcon /> : '保存'}
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditStaffPasswordInput>({
    resolver: zodResolver(editStaffPasswordSchema),
  });

  const onSubmit = async (data: EditStaffPasswordInput) => {
    try {
      await editStaffPassword(staffId, data);
      toast.success('パスワードの更新に成功しました');
      setIsEditPasswordOpen(false);
    } catch (error) {
      toast.error('パスワードの更新に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

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
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="password">新しいパスワード</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">確認パスワード</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-48"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoaderCircleIcon /> : '保存'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function StaffCardMenu({
  isDemo,
  staff,
  selectedPeriod,
}: StaffCardMenuProps) {
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
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/admin/staff/${staff.id}`}>
              <Icons.FileText className="mr-2 size-4" />
              詳細
            </Link>
          </DropdownMenuItem>
          {selectedPeriod ? (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href={`/admin/staff/${staff.id}/evaluation?periodId=${selectedPeriod.id}`}
              >
                <Icons.ClipboardList className="mr-2 size-4" />
                評価
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem disabled>
              <Icons.ClipboardList className="mr-2 size-4" />
              評価(期間未選択)
            </DropdownMenuItem>
          )}

          {isDemo ? (
            <DropdownMenuItem
              disabled
              className="cursor-not-allowed text-muted-foreground"
            >
              <Icons.Pencil className="mr-2 size-4" />
              編集（デモモードのため不可）
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setIsEditOpen(true)}
            >
              <Icons.Pencil className="mr-2 size-4" />
              編集
            </DropdownMenuItem>
          )}

          {isDemo ? (
            <DropdownMenuItem
              disabled
              className="cursor-not-allowed text-muted-foreground"
            >
              <Icons.KeyRound className="mr-2 size-4" />
              パスワード変更(デモモードのため不可)
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setIsEditPasswordOpen(true)}
            >
              <Icons.KeyRound className="mr-2 size-4" />
              パスワード変更
            </DropdownMenuItem>
          )}
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
        staffAvatarUrl={staff.avatar_url}
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
