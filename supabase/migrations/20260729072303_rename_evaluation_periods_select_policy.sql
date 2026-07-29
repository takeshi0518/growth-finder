-- #223 対応: evaluation_periodsのSELECTポリシーは"admins can select..."という
-- 名前だがrole='admin'条件が無く、実際はadmin/staffどちらも閲覧できる。
--
-- staff/page.tsx が自分の評価期間を切り替えて過去データを見るために
-- staff自身のセッションでevaluation_periods(id, name)を直接SELECTしており、
-- これは正規の機能。role='admin'を足すとstaffの評価閲覧機能が壊れるため、
-- 挙動は変更せず、ポリシー名とコメントを実態(組織メンバー全員がSELECT可、
-- INSERT/UPDATE/DELETEのみadmin限定)に合わせて修正する。

DROP POLICY IF EXISTS "admins can select evaluation_periods" ON evaluation_periods;

-- 同じorganization_idの組織メンバー(admin/staff問わず)は閲覧可能
CREATE POLICY "organization members can select evaluation_periods"
ON evaluation_periods FOR select
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
  )
);
