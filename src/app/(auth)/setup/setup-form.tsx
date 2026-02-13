'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoaderCircleIcon from '@/components/shared/loader-circle';

export default function SetupForm() {
  return (
    <div className="space-y-6">
      <form className="space-y-4">
        {/* 名前 */}
        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input id="name" type="text" placeholder="山田太郎" />
          {/* {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )} */}
        </div>

        {/* 店舗名 */}
        <div className="space-y-2">
          <Label htmlFor="storeName">店舗名</Label>
          <Input id="storeName" type="text" placeholder="◯◯◯店" />

          {/* {errors.storeName && (
            <p className="text-sm text-red-500">{errors.storeName.message}</p>
          )} */}
        </div>

        {/* ログインボタン */}
        <Button type="submit" className="w-full" size="lg">
          {/* {isLoading.signup ? <LoaderCircleIcon /> : 'アカウントを作成'} */}
          登録する
        </Button>
      </form>
    </div>
  );
}
