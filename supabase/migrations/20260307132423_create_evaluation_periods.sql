
-- evaluation_periodsテーブル作成
CREATE TABLE evaluation_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  name TEXT NOT NULL,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLSを有効化
ALTER TABLE evaluation_periods ENABLE ROW LEVEL SECURITY;

-- 同じorganization_idの管理者は閲覧可能
CREATE POLICY "admins can select evaluation_periods"
ON evaluation_periods FOR select
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
  )
);

-- 同じorganization_idの管理者のみ作成可能
CREATE POLICY "admins can insert evaluation_periods"
ON evaluation_periods FOR INSERT
TO authenticated
WITH CHECK (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 同じorganization_idの管理者のみ更新可能
CREATE POLICY "admins can update evaluation_periods"
ON evaluation_periods FOR update
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 同じorganization_idの管理者のみ削除可能
CREATE POLICY "admins can delete evaluation_periods"
ON evaluation_periods FOR DELETE
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

