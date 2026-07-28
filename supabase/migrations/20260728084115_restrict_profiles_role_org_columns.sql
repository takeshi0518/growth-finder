-- #217 対応: profilesのUPDATE RLSに列制限が無く、
-- staffが自分自身のrole/organization_idを書き換えて権限昇格できる問題を修正する

-- ヘルパー関数: 呼び出しユーザーがadminかどうかを判定する
-- (profilesのポリシー内でprofilesをEXISTSで直接参照すると無限再帰になるため、
--  get_user_organization_id()と同様にSECURITY DEFINER関数として切り出す)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'admin'
    FROM public.profiles
    WHERE id = auth.uid()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- "Users can update organization profiles"(同一組織・自分以外を対象)に
-- role='admin'チェックが無く、staffが他ユーザーの行を書き換えられたため、
-- 本来の意図(adminのみが同一組織の他ユーザーを更新できる)に条件を戻す
DROP POLICY IF EXISTS "Users can update organization profiles" ON profiles;

CREATE POLICY "Users can update organization profiles"
ON profiles
FOR UPDATE
USING (
  organization_id = public.get_user_organization_id()
  AND id != auth.uid()
  AND public.is_admin()
)
WITH CHECK (
  organization_id = public.get_user_organization_id()
  AND id != auth.uid()
  AND public.is_admin()
);

-- RLSは行単位の制御であり列は区別できないため、
-- "User can  update own profile"(自分の行)経由でrole/organization_idまで
-- 書き換え可能になっていた。列単位のGRANTでauthenticatedロールから
-- role/organization_id/is_demoへの書き込み自体を禁止する。
-- (role/organization_idを書き込む唯一の正規フローはaddStaff()で、
--  service_roleクライアント経由のためこの制限の影響を受けない)
REVOKE UPDATE ON public.profiles FROM authenticated;

GRANT UPDATE (
  name,
  store_name,
  email,
  avatar_url,
  is_setup_complete
) ON public.profiles TO authenticated;
