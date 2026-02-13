-- ヘルパー関数

CREATE OR REPLACE FUNCTION public.get_user_organization_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT organization_id
    FROM public.profiles
    WHERE id = auth.uid()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 問題のポリシーを削除
DROP POLICY IF EXISTS "Admin can view organization profiles" ON profiles;
DROP POLICY IF EXISTS "Admin can update organization staff" ON profiles;
DROP POLICY IF EXISTS "Admin can delete organization staff but not self" ON profiles;

-- 新しいポリシー

-- SELECTポリシー(同じ組織)
CREATE POLICY "Users can view organization profiles"
ON profiles
FOR SELECT
USING (
  organization_id = public.get_user_organization_id()
);

-- UPDATEポリシー(同じ組織、自分以外)
CREATE POLICY "Users can update organization profiles"
ON profiles
FOR UPDATE
USING (
  organization_id = public.get_user_organization_id()
  AND id != auth.uid()
)
WITH CHECK (
  organization_id = public.get_user_organization_id()
  AND id != auth.uid()
);

-- DELETEポリシー(同じ組織、自分以外)
CREATE POLICY "Users can delete organization profiles"
ON profiles
FOR DELETE
USING (
  organization_id = public.get_user_organization_id()
  AND id != auth.uid()
);