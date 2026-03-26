
-- evaluationsテーブル作成
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  evaluation_period_id UUID NOT NULL REFERENCES evaluation_periods(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE, 
  evaluator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  evaluation_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'completed')),
  action_plan TEXT,
  total_comment TEXT,
  future_vision TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (staff_id, evaluation_period_id)
);



-- インデックス作成
CREATE INDEX evaluation_period_id_idx ON evaluations(evaluation_period_id);
CREATE INDEX staff_id_idx ON evaluations(staff_id);
CREATE INDEX evaluator_id_idx ON evaluations(evaluator_id);
CREATE INDEX status_idx ON evaluations(status);

-- RLSを有効化
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

-- 同じorganization_idの管理者は閲覧可能
CREATE POLICY "admins can select evaluations"
ON evaluations FOR SELECT
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
  )
);

-- 同じorganization_idの管理者のみ作成可能
CREATE POLICY "admins can insert evaluations"
ON evaluations FOR INSERT
TO authenticated
WITH CHECK (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 同じorganization_idの管理者のみ更新可能
CREATE POLICY "admins can update evaluations"
ON evaluations FOR UPDATE
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 同じorganization_idの管理者のみ削除可能
CREATE POLICY "admins can delete evaluations"
ON evaluations FOR DELETE
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- evaluation_sectionsテーブル作成
CREATE TABLE evaluation_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL,
  section_type TEXT NOT NULL CHECK (section_type IN ('basic', 'cashier', 'barista')),
  skill_good_points TEXT[],
  skill_improvement_points TEXT[],
  hospitality_good_points TEXT[],
  hospitality_improvement_points TEXT[],
  cleanliness_good_points TEXT[],
  cleanliness_improvement_points TEXT[],
  skill_score INTEGER NOT NULL,
  skill_max INTEGER NOT NULL,
  hospitality_score INTEGER NOT NULL,
  hospitality_max INTEGER NOT NULL,
  cleanliness_score  INTEGER NOT NULL,
  cleanliness_max INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- インデックス作成
CREATE INDEX evaluation_id_idx ON evaluation_sections(evaluation_id);
CREATE INDEX section_type_idx ON evaluation_sections(section_type);

-- RLSを有効化
ALTER TABLE evaluation_sections ENABLE ROW LEVEL SECURITY;

-- 同じorganization_idの管理者は閲覧可能
CREATE POLICY "admins can select evaluation_sections"
ON evaluation_sections FOR SELECT
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
  )
);

-- 同じorganization_idの管理者のみ作成可能
CREATE POLICY "admins can insert evaluation_sections"
ON evaluation_sections FOR INSERT
TO authenticated
WITH CHECK (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 同じorganization_idの管理者のみ更新可能
CREATE POLICY "admins can update evaluation_sections"
ON evaluation_sections FOR UPDATE
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 同じorganization_idの管理者のみ削除可能
CREATE POLICY "admins can delete evaluation_sections"
ON evaluation_sections FOR DELETE
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- evaluation_itemsテーブル作成
CREATE TABLE evaluation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_section_id UUID NOT NULL REFERENCES evaluation_sections(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('skill', 'hospitality', 'cleanliness')),
  score INTEGER CHECK (score >= 1 AND score <= 4),
  check_points TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- インデックス作成
CREATE INDEX evaluation_section_id_idx ON evaluation_items(evaluation_section_id);
CREATE INDEX category_idx ON evaluation_items(category);

-- RLSを有効化
ALTER TABLE evaluation_items ENABLE ROW LEVEL SECURITY;

-- 同じorganization_idの管理者は閲覧可能
CREATE POLICY "admins can select evaluation_items"
ON evaluation_items FOR SELECT
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
  )
);

-- 同じorganization_idの管理者のみ作成可能
CREATE POLICY "admins can insert evaluation_items"
ON evaluation_items FOR INSERT
TO authenticated
WITH CHECK (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 同じorganization_idの管理者のみ更新可能
CREATE POLICY "admins can update evaluation_items"
ON evaluation_items FOR UPDATE
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 同じorganization_idの管理者のみ削除可能
CREATE POLICY "admins can delete evaluation_items"
ON evaluation_items FOR DELETE
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);