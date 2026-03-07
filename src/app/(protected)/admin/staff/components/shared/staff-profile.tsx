'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tables } from '../../../../../../../types/supabase';
import { EditStaffInput, editStaffSchema } from '@/lib/validations/schemas';
import { editStaff } from '../../actions';
import { getErrorMessage } from '@/lib/utils/error-message';
import LoaderCircleIcon from '@/components/shared/loader-circle';
import {
  AVATAR_ALLOWED_TYPES,
  AVATAR_MAX_SIZE,
  AVATAR_MAX_SIZE_LABEL,
} from '@/lib/constants/upload';
import { uploadStaffAvatar } from '@/lib/utils/upload';

type Profile = Pick<
  Tables<'profiles'>,
  'name' | 'role' | 'store_name' | 'email' | 'avatar_url'
>;

type StaffProfile = {
  targetStaff: Profile;
  staffId: string;
};

export default function StaffProfile({ targetStaff, staffId }: StaffProfile) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    targetStaff.avatar_url
  );
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditStaffInput>({
    resolver: zodResolver(editStaffSchema),
    defaultValues: {
      name: targetStaff.name ?? '',
      email: targetStaff.email ?? '',
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
    } catch (error) {
      toast.error('スタッフの更新に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Icons.FileText className="w-5 h-5" />
            スタッフ詳細
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col gap-5 ">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-2 overflow-hidden bg-card flex items-center justify-center">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={targetStaff.name}
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
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-background border rounded-full px-2 py-0.5 text-xs"
                  >
                    編集
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Label>店舗名</Label>
                  <p className="text-sm text-muted-foreground">
                    {targetStaff.store_name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Label>役職</Label>
                  <p className="text-sm text-muted-foreground">
                    {targetStaff.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 w-full max-w-md">
              <Label htmlFor="name">名前</Label>
              <Input id="name" type="text" {...register('name')} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name?.message}</p>
              )}
            </div>
            <div className="space-y-2 w-full max-w-md">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email?.message}</p>
              )}
            </div>

            <div className="text-center w-full max-w-md">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:max-w-48"
              >
                {isSubmitting ? <LoaderCircleIcon /> : '保存'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
