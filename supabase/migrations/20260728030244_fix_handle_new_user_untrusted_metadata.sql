-- handle_new_user() は auth.users への INSERT で発火する SECURITY DEFINER トリガーであり、
-- RLS を経由せず profiles に書き込める唯一の境界だった。
-- これまでは raw_user_meta_data の role / organization_id をそのまま信用していたため、
-- クライアントが supabase.auth.signUp() を直接叩き、既存組織の organization_id と
-- role: 'admin' を指定するだけで、承認なしに他組織へ admin として侵入できてしまっていた。
--
-- このトリガーは公開サインアップ(supabase.auth.signUp)と、
-- 管理者によるスタッフ作成(supabaseAdmin.auth.admin.createUser、addStaff() 内)の
-- 両方で共用されており、DB 側からは呼び出し元の信頼レベルを区別できない。
-- そのため role / organization_id は常に安全側のデフォルト(新規組織の admin)に固定し、
-- スタッフ作成時の正しい role / organization_id への上書きは、
-- requireAdmin() で権限検証済みのサーバー側(addStaff())が明示的に行う。
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_is_setup_complete BOOLEAN;
BEGIN
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
    'admin',
    COALESCE(NEW.raw_user_meta_data->>'store_name', '店舗名未設定'),
    gen_random_uuid(),
    v_is_setup_complete
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
