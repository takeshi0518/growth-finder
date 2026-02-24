'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icon/icons';
import { toast } from 'sonner';
import {
  UpdateProfileInput,
  updateProfileSchema,
} from '@/lib/validations/auth';
import { updateProfile } from './actions';
import LoaderCircleIcon from '@/components/shared/loader-circle';
import { getErrorMessage } from '@/lib/utils/error-message';

type Profile = {
  name: string;
  store_name: string;
  email: string;
} | null;

type SettingFormProps = {
  profile: Profile;
};

export default function SettingForm({ profile }: SettingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile?.name ?? '',
      storeName: profile?.store_name ?? '',
      email: profile?.email ?? '',
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    try {
      await updateProfile(data);
      toast.success('プロフィールを更新しました');
    } catch (error) {
      toast.error('プロフィールの更新に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 overflow-hidden bg-card- flex items-center justify-center">
            <Icons.UserCircle className="w-16 h-16 text-muted-foreground" />
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-background border rounded-full px-2 py-0.5 text-xs"
          >
            編集
          </button>
          <input type="file" accept="image/*" className="hidden" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">名前</Label>
        <Input id="name" type="text" {...register('name')} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="storeName">店舗名</Label>
        <Input id="storeName" type="text" {...register('storeName')} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.storeName?.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full">
        {isSubmitting ? <LoaderCircleIcon /> : '保存'}
      </Button>
    </form>
  );
}
