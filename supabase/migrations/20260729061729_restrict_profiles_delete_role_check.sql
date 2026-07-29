-- #219 対応: profilesのDELETE RLSにroleチェックが無く、
-- staffが同じ組織の他ユーザー(admin含む)のprofile行を削除できる問題を修正する
--
-- "Users can delete organization profiles"は無限再帰対策のリファクタ
-- (20260213144534_fix_rls_policies_infinite_recursion.sql)で作り直された際、
-- 元々あったrole='admin'チェックが失われていた。#217で追加したis_admin()を
-- 再利用して条件を復元する。

DROP POLICY IF EXISTS "Users can delete organization profiles" ON profiles;

CREATE POLICY "Users can delete organization profiles"
ON profiles
FOR DELETE
USING (
  organization_id = public.get_user_organization_id()
  AND id != auth.uid()
  AND public.is_admin()
);
