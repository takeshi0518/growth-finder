ALTER TABLE profiles
ADD COLUMN is_setup_complete BOOLEAN DEFAULT FALSE;

-- 既存のメール/パスワードユーザーは完了済みとする
UPDATE profiles
SET is_setup_complete = TRUE
WHERE name != '名前未設定' AND store_name != '店舗未設定';

-- トリガー関数を更新
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
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
    (NEW.raw_user_meta_data->>'organization_id')::UUID,
    CASE
      WHEN NEW.raw_user_meta_data->>'name' IS NOT NULL
            AND NEW.raw_user_meta_data->>'store_name' IS NOT NULL
      THEN TRUE
      ELSE FALSE
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;