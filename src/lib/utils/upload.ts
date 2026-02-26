'use server';

import { createClient } from '../supabase/server';
import { AVATAR_ALLOWED_TYPES, AVATAR_MAX_SIZE } from '@/lib/constants/upload';

export async function uploadAvatar(formData: FormData, userId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('認証エラーが発生しました');

  const file = formData.get('avatar') as File;
  if (!file) throw new Error('ファイルが選択されていません');

  if (!AVATAR_ALLOWED_TYPES.includes(file.type)) {
    throw new Error('jpeg・png・webp形式の画像を選択してください');
  }

  if (file.size > AVATAR_MAX_SIZE) {
    throw new Error('ファイルサイズは2MB以下にしてください');
  }

  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw new Error('画像のアップロードに失敗しました');

  const {
    data: { publicUrl },
  } = supabase.storage.from('avatars').getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', user.id);

  if (updateError) throw new Error('プロフィールの更新に失敗しました');

  return { publicUrl };
}
