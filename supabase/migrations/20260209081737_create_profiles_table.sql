
-- profilesテーブル作成
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'staff')),
  store_name TEXT NOT NULL,
  organization_id UUID,
  avatar_url TEXT,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- インデックス作成
CREATE INDEX profiles_email_idx ON profiles(email);
CREATE INDEX profiles_role_idx ON profiles(role);
CREATE INDEX profiles_organization_id_idx ON profiles(organization_id);

-- RLSを有効化
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ポリシー 自分のプロフィールを閲覧できる
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- ポリシー 管理者は同じ組織のスタッフを閲覧できる
CREATE POLICY "Admin can view organization profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles AS my_profile
      WHERE my_profile.id = auth.uid()
      AND my_profile.role = 'admin'
      AND my_profile.organization_id = profiles.organization_id
    )
  );

--ポリシー 自分のプロフィールを更新できる
CREATE POLICY "User can  update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
  );

-- ポリシー 管理者は同じ組織のスタッフを更新できる
CREATE POLICY "Admin can update organization staff"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles AS my_profile
      WHERE my_profile.id = auth.uid()
      AND my_profile.role = 'admin'
      AND my_profile.organization_id = profiles.organization_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles AS my_profile
      WHERE my_profile.id = auth.uid()
      AND my_profile.role = 'admin'
      AND my_profile.organization_id = profiles.organization_id
    )
  );

-- ポリシー 管理者は同じ組織のスタッフを削除できる(自分自身は削除不可)

CREATE POLICY "Admin can delete organization staff but not self"
  ON profiles FOR DELETE
  USING (
    id != auth.uid()
    AND EXISTS (
      SELECT 1 FROM profiles AS my_profile
      WHERE my_profile.id = auth.uid()
      AND my_profile.role = 'admin'
      AND my_profile.organization_id = profiles.organization_id
    )
  );

-- update_atを自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

-- updated_at自動更新トリガー
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

--トリガー関数 新規ユーザー作成時にprofilesも作成
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role, store_name, organization_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '名前未設定'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin'),
    COALESCE(NEW.raw_user_meta_data->>'store_name', '店舗名未設定'),
    (NEW.raw_user_meta_data->>'organization_id')::UUID
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガー auth.usersにinsertされたら実行
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();



