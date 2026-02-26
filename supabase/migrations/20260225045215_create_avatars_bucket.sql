INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- 誰でもavatarsバケットのファイルを閲覧可能
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING(bucket_id = 'avatars');

-- 認証済みユーザーは自分のアバターをアップロード可能
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 認証済みユーザーは自分のアバターを更新可能
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 認証済みユーザーは自分のアバターを削除可能
CREATE POLICY "User can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars'
  AND auth.uid()::text = (storage.foldername(name))[1]
);