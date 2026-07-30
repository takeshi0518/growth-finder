-- #212 対応: 20260624053110_grant_dml_privileges.sqlでauthenticatedロールへの
-- テーブルGRANTを追加した際、service_roleへのGRANTが漏れていた。
--
-- service_roleはBYPASSRLS属性によりRLSチェックはスキップされるが、
-- テーブルレベルのGRANTはRLSとは独立した権限レイヤーであり免除されない。
-- そのためservice_roleクライアント経由のテーブル直接操作
-- (src/lib/utils/upload.tsのuploadStaffAvatar、
--  src/app/(protected)/admin/staff/actions.tsのaddStaff)が
-- permission deniedで失敗する状態だった。
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO service_role;

-- 今後追加されるテーブルにも自動付与（再発防止）
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO service_role;
