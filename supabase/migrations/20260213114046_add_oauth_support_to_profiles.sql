
-- is_setup_complete カラムを追加
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS is_setup_complete BOOLEAN DEFAULT FALSE;

-- トリガー関数を更新（organization_id の自動生成を追加）
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_organization_id UUID;
  v_is_setup_complete BOOLEAN;
BEGIN
  v_organization_id := (NEW.raw_user_meta_data->>'organization_id')::UUID;
  
  IF v_organization_id IS NULL THEN
    v_organization_id := gen_random_uuid();
  END IF;
  
  v_is_setup_complete := (
    NEW.raw_user_meta_data->>'name' IS NOT NULL 
    AND NEW.raw_user_meta_data->>'store_name' IS NOT NULL
  );
  
  INSERT INTO public.profiles (
    id,
    email,
    name,
    role,
    store_name,
    organization_id,
    is_setup_complete
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '名前未設定'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin'),
    COALESCE(NEW.raw_user_meta_data->>'store_name', '店舗名未設定'),
    v_organization_id,
    v_is_setup_complete
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

UPDATE profiles
SET is_setup_complete = TRUE
WHERE name != '名前未設定' AND store_name != '店舗名未設定';