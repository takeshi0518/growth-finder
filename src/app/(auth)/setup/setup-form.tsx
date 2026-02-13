'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SetupInput, setupSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoaderCircleIcon from '@/components/shared/loader-circle';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

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

  async function onSubmit(data: SetupInput) {
    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('ユーザーが見つかりません');
      }

      const { error, data: d } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          store_name: data.storeName,
          is_setup_complete: true,
        })
        .eq('id', user.id);

      console.log('data:', d);
      console.log('error', error);

      if (error) throw error;
      router.push('/admin');
    } catch (error) {
      console.error('Setup error', error);
      toast.error('登録に失敗しました', {
        description: 'もう一度お試しください',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
