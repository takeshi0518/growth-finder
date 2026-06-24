-- 全テーブルでRLSが有効であることを確認済み。
-- RLSが行レベルでアクセスを制御するため、テーブルレベルのGRANTを付与する。
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- 今後追加されるテーブルにも自動付与（再発防止）
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;