
-- evaluationsテーブル作成
CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_period_id UUID NOT NULL REFERENCES evaluaiton_periods(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE, 
  evaluator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  evaluation_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'completed')),
  action_plan TEXT,
  total_comment TEXT,
  future_vision TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- evaluation_sectionsテーブル作成
CREATE TABLE evaluation_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL CHECK (section_type IN ('basic', 'cashier', 'barista')),
  skill_score INTEGER NOT NULL,
  skill_max INTEGER NOT NULL,
  hospitality_score INTEGER NOT NULL,
  hospitality_max INTEGER NOT NULL,
  cleanliness_score  INTEGER NOT NULL,
  cleanliness_max INTEGER NOT NULL,
  action_plan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- evaluation_itemsテーブル作成
CREATE TABLE evaluation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_section_id UUID NOT NULL REFERENCES evaluation_sections(id) ON DELETE CASCADE,
  item_key TEXT NOT NULL,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('skill', 'hospitality', 'cleanliness')),
  score INTEGER CHECK (score >= 1 AND score <= 4),
  good_points TEXT[],
  improvement_points TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

