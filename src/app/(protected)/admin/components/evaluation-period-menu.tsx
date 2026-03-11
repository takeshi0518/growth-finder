'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icon/icons';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tables } from '../../../../../types/supabase';
import { deleteEvaluationPeriod, editEvaluationPeriod } from '../actions';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils/error-message';
import { useForm } from 'react-hook-form';
import {
  EditEvaluationPeriodInput,
  editEvaluationPeriodSchema,
} from '@/lib/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import LoaderCircleIcon from '@/components/shared/loader-circle';

type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id' | 'name'>;

type EvaluationPeriodMenuProps = {
  evaluationPeriod: EvaluationPeriod;
};

type DeleteDialogProps = {
  evaluationPeriodName: string;
  evaluationPeriodId: string;
  isDeleteOpen: boolean;
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
};

type EditDialogProps = {
  evaluationPeriodName: string;
  evaluationPeriodId: string;
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
};

function DeleteDialog({
  evaluationPeriodName,
  evaluationPeriodId,
  isDeleteOpen,
  setIsDeleteOpen,
}: DeleteDialogProps) {
  const handleDelete = async () => {
    try {
      await deleteEvaluationPeriod(evaluationPeriodId);
      toast.success('評価期間を削除しました');
    } catch (error) {
      toast.error('評価期間の削除に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {evaluationPeriodName}を削除しますか？
          </AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消せません。評価期間の全データが完全に削除されます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive! hover:bg-destructive/90!"
          >
            削除する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EditDialog({
  evaluationPeriodName,
  evaluationPeriodId,
  isEditOpen,
  setIsEditOpen,
}: EditDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditEvaluationPeriodInput>({
    resolver: zodResolver(editEvaluationPeriodSchema),
    defaultValues: {
      name: evaluationPeriodName,
    },
  });

  const onSubmit = async (data: EditEvaluationPeriodInput) => {
    try {
      await editEvaluationPeriod(data, evaluationPeriodId);
      toast.success('評価期間を変更しました');
      setIsEditOpen(false);
    } catch (error) {
      toast.error('評価期間の更新に失敗しました', {
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
              <span>評価期間名を編集</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">評価期間名</Label>
            <Input id="name" type="text" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name?.message}</p>
            )}
          </div>
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-28"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoaderCircleIcon /> : '更新'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function EvaluationPeriodMenu({
  evaluationPeriod,
}: EvaluationPeriodMenuProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <Icons.EllipsisVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setIsEditOpen(true)}
          >
            <Icons.Pencil className="mr-2 size-4" />
            編集
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-destructive"
            onSelect={() => setIsDeleteOpen(true)}
          >
            <Icons.Trash2 className="mr-2 size-4" />
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDialog
        evaluationPeriodName={evaluationPeriod.name}
        evaluationPeriodId={evaluationPeriod.id}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
      />

      <EditDialog
        evaluationPeriodName={evaluationPeriod.name}
        evaluationPeriodId={evaluationPeriod.id}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
      />
    </>
  );
}
