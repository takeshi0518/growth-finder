-- #222 対応: profilesのSELECT RLSにroleチェックが無く、
-- staffが同じ組織の他ユーザー(admin含む)のprofile行を閲覧できる問題を修正する
--
-- "Users can view organization profiles"は無限再帰対策のリファクタ
-- (20260213144534_fix_rls_policies_infinite_recursion.sql)で作り直された際、
-- 元々あったrole='admin'チェックが失われていた。自分の行は
-- "Users can view own profile"で既にカバーされているため、
-- こちらには#217で追加したis_admin()を条件として足すだけでよい。

DROP POLICY IF EXISTS "Users can view organization profiles" ON profiles;

CREATE POLICY "Users can view organization profiles"
ON profiles
FOR SELECT
USING (
  organization_id = public.get_user_organization_id()
  AND public.is_admin()
);
