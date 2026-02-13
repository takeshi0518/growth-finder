'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoaderCircleIcon from '@/components/shared/loader-circle';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SetupInput, setupSchema, SingupInput } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SetupForm() {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupInput>({
    resolver: zodResolver(setupSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: SingupInput) {}
  return (
    <div className="space-y-6">
      <form className="space-y-4">
        {/* 名前 */}
        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input
            id="name"
            type="text"
            placeholder="山田太郎"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* 店舗名 */}
        <div className="space-y-2">
          <Label htmlFor="storeName">店舗名</Label>
          <Input
            id="storeName"
            type="text"
            placeholder="◯◯◯店"
            {...register('storeName')}
          />

          {errors.storeName && (
            <p className="text-sm text-red-500">{errors.storeName.message}</p>
          )}
        </div>

        {/* ログインボタン */}
        <Button type="submit" className="w-full" size="lg">
          {isLoading ? <LoaderCircleIcon /> : 'アカウントを作成'}
          登録する
        </Button>
      </form>
    </div>
  );
}
