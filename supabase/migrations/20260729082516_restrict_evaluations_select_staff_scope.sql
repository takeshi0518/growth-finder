-- #216 対応: evaluations/evaluation_sections/evaluation_itemsのSELECTポリシーに
-- role='admin'条件が無く、staffが同じ組織の他スタッフ全員の評価データ
-- (評価コメント・スコア等)を閲覧できてしまう問題を修正する。
--
-- #223(evaluation_periods)とは異なり、staffが見て良いのは自分自身の評価
-- だけであり、他スタッフの評価が見えること自体がプライバシー上の問題。
-- そのため単純にadmin限定にするのではなく、
-- 「adminは組織内全件、staffは自分自身の評価のみ」という条件に修正する。

-- evaluations: staff_idを直接持つため staff_id = auth.uid() で判定できる
DROP POLICY IF EXISTS "admins can select evaluations" ON evaluations;

CREATE POLICY "organization members can select evaluations"
ON evaluations FOR SELECT
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
  )
  AND (
    staff_id = auth.uid()
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  )
);

-- evaluation_sections: staff_idを持たないため、evaluationsを辿って判定する
DROP POLICY IF EXISTS "admins can select evaluation_sections" ON evaluation_sections;

CREATE POLICY "organization members can select evaluation_sections"
ON evaluation_sections FOR SELECT
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
  )
  AND (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
    OR EXISTS (
      SELECT 1 FROM evaluations
      WHERE evaluations.id = evaluation_sections.evaluation_id
      AND evaluations.staff_id = auth.uid()
    )
  )
);

-- evaluation_items: evaluation_sections->evaluationsと2段階辿って判定する
DROP POLICY IF EXISTS "admins can select evaluation_items" ON evaluation_items;

CREATE POLICY "organization members can select evaluation_items"
ON evaluation_items FOR SELECT
TO authenticated
USING (
  organization_id = (
    SELECT organization_id FROM profiles
    WHERE id = auth.uid()
  )
  AND (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
    OR EXISTS (
      SELECT 1 FROM evaluation_sections
      JOIN evaluations ON evaluations.id = evaluation_sections.evaluation_id
      WHERE evaluation_sections.id = evaluation_items.evaluation_section_id
      AND evaluations.staff_id = auth.uid()
    )
  )
);
