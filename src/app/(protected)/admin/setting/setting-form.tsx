'use client';

import { useState } from 'react';
import { useRef } from 'react';
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
import { updateProfile, uploadAvatar } from './actions';
import LoaderCircleIcon from '@/components/shared/loader-circle';
import { getErrorMessage } from '@/lib/utils/error-message';
import Image from 'next/image';

type Profile = {
  name: string;
  store_name: string;
  email: string;
  avatar_url: string;
} | null;

type SettingFormProps = {
  profile: Profile;
};

export default function SettingForm({ profile }: SettingFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    profile?.avatar_url ?? null
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', '/image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('jpeg・png・webp形式の画像を選択してください');
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('ファイルサイズは2MB以下にしてください');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const result = await uploadAvatar(formData);
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
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="アバター"
                fill
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
