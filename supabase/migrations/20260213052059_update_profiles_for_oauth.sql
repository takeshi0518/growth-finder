CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_organization_id UUID;
BEGIN
  v_organization_id := (NEW.raw_user_meta_data->>'organization_id')::UUID;

  IF v_organization_id IS NULL THEN
    v_organization_id := gen_random_uuid();
  END IF;
  
  INSERT INTO public.profiles (id, email, name, role, store_name, organization_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '名前未設定'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin'),
    COALESCE(NEW.raw_user_meta_data->>'store_name', '店舗名未設定'),
    v_organization_id 
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS is_setup_complete BOOLEAN DEFAULT FALSE;
