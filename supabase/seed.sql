INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'authenticated',
  'authenticated',
  'demo@example.com',
  crypt('demopage1111', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

UPDATE profiles SET
  name = 'デモ管理者',
  role = 'admin',
  store_name = 'Demo Cafe',
  organization_id = '11111111-1111-1111-1111-111111111111',
  is_demo = true,
  is_setup_complete = true
WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'authenticated',
  'authenticated',
  'demo1@example.com',
  crypt('demopage2222', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

UPDATE profiles SET
  name = 'デモスタッフA',
  role = 'staff',
  store_name = 'Demo Cafe',
  organization_id = '11111111-1111-1111-1111-111111111111',
  is_demo = true,
  is_setup_complete = true
WHERE id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'authenticated',
  'authenticated',
  'demo2@example.com',
  crypt('demopage3333', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

UPDATE profiles SET
  name = 'デモスタッフB',
  role = 'staff',
  store_name = 'Demo Cafe',
  organization_id = '11111111-1111-1111-1111-111111111111',
  is_demo = true,
  is_setup_complete = true
WHERE id = 'cccccccc-cccc-cccc-cccc-cccccccccccc';

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  'authenticated',
  'authenticated',
  'demo3@example.com',
  crypt('demopage4444', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

UPDATE profiles SET
  name = 'デモスタッフC',
  role = 'staff',
  store_name = 'Demo Cafe',
  organization_id = '11111111-1111-1111-1111-111111111111',
  is_demo = true,
  is_setup_complete = true
WHERE id = 'dddddddd-dddd-dddd-dddd-dddddddddddd';

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
  'authenticated',
  'authenticated',
  'demo4@example.com',
  crypt('demopage5555', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

UPDATE profiles SET
  name = 'デモスタッフD',
  role = 'staff',
  store_name = 'Demo Cafe',
  organization_id = '11111111-1111-1111-1111-111111111111',
  is_demo = true,
  is_setup_complete = true
WHERE id = 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee';

INSERT INTO evaluation_periods (
  id,
  organization_id,
  name,
  is_current
) VALUES (
  'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
  '11111111-1111-1111-1111-111111111111',
  '2026年4月',
  true
);

INSERT INTO evaluation_periods (
  id,
  organization_id,
  name,
  is_current
) VALUES (
  'f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2',
  '11111111-1111-1111-1111-111111111111',
  '2026年7月',
  false
);

INSERT INTO evaluations (
  id,
  organization_id,
  evaluation_period_id,
  staff_id,
  evaluator_id,
  evaluation_date,
  status,
  action_plan,
  total_comment,
  future_vision
) VALUES (
  'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1',
  '11111111-1111-1111-1111-111111111111',
  'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  NOW(),
  'completed',
  '基本動作：自分から後輩へ声をかけて良い関係を築く。バリスタ：毎日カフェラテの練習をする。 キャッシャー：お客さまへ、天気や注文されたものなど些細なことでもいいので声をかける。',
  '総合的にみて仕事はある程度できます。仕事がとても丁寧で好感がもてます。次のステップとして後輩を指導してお店の中心になっていきましょう。',
  'キャッシャーでは自らお客様へ商品を進めることができる。バリスタでは忙しい時間帯でもカフェラテをきれいに作成できるようになっている。後輩を指導できている。'
);

INSERT INTO evaluations (
  id,
  organization_id,
  evaluation_period_id,
  staff_id,
  evaluator_id,
  evaluation_date,
  status,
  action_plan,
  total_comment,
  future_vision
) VALUES (
  'e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e2e2',
  '11111111-1111-1111-1111-111111111111',
  'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  NOW(),
  'completed',
  '基本動作：腸内検査、シフト提出期限を守りましょう。信頼につながります。バリスタ：マニュアルを暗記できていないところがあるので、勤務前にしっかりと確認しましょう。キャッシャー：緊張で声が小さくなる場面があるので、徐々に声のボリュームを上げましょう。',
  '勤務スタートから６ヶ月。基本的な作業は出来るようになりました。真面目に仕事を取り組んでいてとても好感が持てます。先輩の後ろ姿を参考にして、マニュアルに無い仕事の動きなど、応用的な力をつけていきましょう。',
  'キャッシャーでは堂々とした対応でお客様へ安心感を届けることができる。バリスタでは商品の作成ミスを無くし、正確に作業ができるようになっている。'
);

INSERT INTO evaluation_sections (
  id,
  organization_id,
  evaluation_id,
  section_type,
  good_points,
  improvement_points,
  skill_score,
  skill_max,
  hospitality_score,
  hospitality_max,
  cleanliness_score,
  cleanliness_max
) VALUES (
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '11111111-1111-1111-1111-111111111111',
  'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1',
  'basic',
  ARRAY['返事が明るくて良い', '遅刻なし', '姿勢が良い', '仲間に対して優しい'],
  ARRAY[]::text[],
  24,
  32,
  15,
  20,
  18,
  24
);

INSERT INTO evaluation_sections (
  id,
  organization_id,
  evaluation_id,
  section_type,
  good_points,
  improvement_points,
  skill_score,
  skill_max,
  hospitality_score,
  hospitality_max,
  cleanliness_score,
  cleanliness_max
) VALUES (
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '11111111-1111-1111-1111-111111111111',
  'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1',
  'barista',
  ARRAY['レジの打ち間違いが無い', '所作がきれい', '笑顔がいい感じ！'],
  ARRAY['お客さまへの提案が少ない'],
  27,
  36,
  15,
  20,
  12,
  16
);

INSERT INTO evaluation_sections (
  id,
  organization_id,
  evaluation_id,
  section_type,
  good_points,
  improvement_points,
  skill_score,
  skill_max,
  hospitality_score,
  hospitality_max,
  cleanliness_score,
  cleanliness_max
) VALUES (
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '11111111-1111-1111-1111-111111111111',
  'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1',
  'cashier',
  ARRAY['ドリンクの作成が丁寧', '料理の盛り付けが上手'],
  ARRAY['作業台が少しきたない'],
  15,
  20,
  18,
  24,
  21,
  28
);

INSERT INTO evaluation_sections (
  id,
  organization_id,
  evaluation_id,
  section_type,
  good_points,
  improvement_points,
  skill_score,
  skill_max,
  hospitality_score,
  hospitality_max,
  cleanliness_score,
  cleanliness_max
) VALUES (
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '11111111-1111-1111-1111-111111111111',
  'e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e2e2',
  'basic',
  ARRAY['返事が明るくて良い', '元気がある！'],
  ARRAY['遅刻が多い', 'アレルギー対応に不安がある', '腸内検査提出遅れ'],
  24,
  32,
  15,
  20,
  18,
  24
);

INSERT INTO evaluation_sections (
  id,
  organization_id,
  evaluation_id,
  section_type,
  good_points,
  improvement_points,
  skill_score,
  skill_max,
  hospitality_score,
  hospitality_max,
  cleanliness_score,
  cleanliness_max
) VALUES (
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '11111111-1111-1111-1111-111111111111',
  'e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e2e2',
  'barista',
  ARRAY['丁寧な接客', 'レジの打ち間違いが無い'],
  ARRAY['挨拶の声がちょっと小さい', '目線が低い', '商品券対応に不安がある'],
  27,
  36,
  15,
  20,
  12,
  16
);

INSERT INTO evaluation_sections (
  id,
  organization_id,
  evaluation_id,
  section_type,
  good_points,
  improvement_points,
  skill_score,
  skill_max,
  hospitality_score,
  hospitality_max,
  cleanliness_score,
  cleanliness_max
) VALUES (
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '11111111-1111-1111-1111-111111111111',
  'e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e2e2',
  'cashier',
  ARRAY['ひとつひとつの作業が丁寧', 'マニュアルを遵守している'],
  ARRAY['スチームミルクが荒い', '作業台がきたない', '片付けながら作業ができていない'],
  15,
  20,
  18,
  24,
  21,
  28
);
INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '経営理念に沿った行動',
  'skill',
  3,
  ARRAY['内容を理解して自らどう行動するか目標にできている']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '出退勤ができる',
  'skill',
  3,
  ARRAY['打刻ルールを理解できている']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  'シフトを期限内に提出できる',
  'skill',
  3,
  ARRAY['遅れる場合の対応']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '早退、欠勤の連絡ができる',
  'skill',
  3,
  ARRAY['当日の場合は電話で連絡', '体調が悪い場合は無理をしない']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '自店舗の正しい情報',
  'skill',
  3,
  ARRAY['電話番号', '住所', '営業時間']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '守秘義務を理解し守っている',
  'skill',
  3,
  ARRAY['売上', 'マニュアル', 'お客様情報']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  'シフトインのときのコーヒーテイスティング',
  'skill',
  3,
  ARRAY['銘柄確認', '味わい確認']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '電話番号対応ができる',
  'skill',
  3,
  ARRAY['お客様対応', '関係者対応', '保留ボタン']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  'アレルギー対応',
  'hospitality',
  3,
  ARRAY['アレルギー一覧表の取扱い', 'コンタミネーションの理解']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '接客用語に間違いは無いか',
  'hospitality',
  3,
  ARRAY['正しい言葉遣い']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  'クレーム対応',
  'hospitality',
  3,
  ARRAY['責任者への報連相', '謝罪の言葉がある']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '従業員同士の声掛け',
  'hospitality',
  3,
  ARRAY['周りの人へのコミュニケーションがある']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '仲間とのやり取り',
  'hospitality',
  3,
  ARRAY['雰囲気作り']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  'ドレスコードを遵守している',
  'cleanliness',
  3,
  ARRAY['髪が目、頬、肩にかかっていない', '爪']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '正しい手洗いができる',
  'cleanliness',
  3,
  ARRAY['手の甲や指と指の間もきれいに洗浄している']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '店内環境の整備',
  'cleanliness',
  3,
  ARRAY['客席の整理整頓/清掃', '室温をチェックしている', 'BGMの音量をチェックしている']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '腸内検査は毎回提出している',
  'cleanliness',
  3,
  ARRAY['期限内に提出しているか']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '厨房内は走らない',
  'cleanliness',
  3,
  ARRAY['早歩きをしている', '急なターンや振り返りが無い']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
  '周囲の安全確認',
  'cleanliness',
  3,
  ARRAY['移動前に周囲を確認する', 'お湯、水など持っていた時は声を掛けている']
);


INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  'POSレジの基本動作',
  'skill',
  3,
  ARRAY['正確に商品を登録できる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '現金での決済ができる',
  'skill',
  3,
  ARRAY['正確な金銭の授受']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  'キャッシュレス決済ができる',
  'skill',
  3,
  ARRAY['クレジット', '電子マネー', 'QR']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '領収書の発行',
  'skill',
  3,
  ARRAY['手書き発行の際は登録番号を記載']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '商品券の取扱い',
  'skill',
  3,
  ARRAY['使用不可の商品券を覚えている']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '感じの良いあいさつ',
  'hospitality',
  3,
  ARRAY['笑顔', '声のトーン', '入退店時の挨拶']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '感じの良い話し方',
  'hospitality',
  3,
  ARRAY['言葉遣い', 'アイコンタクト', '返事、頷きがある']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '立ち振舞い',
  'hospitality',
  3,
  ARRAY['表情', '姿勢', '丁寧な所作']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '心のこもった感謝の言葉',
  'hospitality',
  3,
  ARRAY['笑顔', 'アイコンタクト', '声のトーン']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  'お客様に沿ったおすすめ',
  'hospitality',
  3,
  ARRAY['商品の案内', 'お客様の要望を汲み取れる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  'バリスタとの連携',
  'hospitality',
  3,
  ARRAY['アイコンタクトを取りスムーズなオペレーションができる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  'ショーケース内の整理整頓',
  'cleanliness',
  3,
  ARRAY['パンくず、ガラス面の指紋の清掃']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  'POSレジ周りの整理整頓',
  'cleanliness',
  3,
  ARRAY['ハサミやペンなど散乱していない']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  'POSレジ周りの清掃',
  'cleanliness',
  3,
  ARRAY['POSレジのホコリがない', 'ショーケース上部のホコリがない']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '提供時の消費期限の確認',
  'cleanliness',
  3,
  ARRAY['販売前に確認している']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '異物混入に対しての意識',
  'cleanliness',
  3,
  ARRAY['作業台にゴミがない']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  '動線、転倒防止への配慮',
  'cleanliness',
  3,
  ARRAY['お客様の足元に水滴などがないか', '障害物がないか']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  'お客様情報の保護',
  'cleanliness',
  3,
  ARRAY['クレジット情報を盗み見ていない']
);


INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  'ラテ作成/ドージング',
  'skill',
  3,
  ARRAY['ポータフィルターの状態']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  'ラテ作成/タンピング',
  'skill',
  3,
  ARRAY['粉をならし垂直に力をかけている']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  'ラテ作成/エスプレッソ抽出',
  'skill',
  3,
  ARRAY['抽出後のエスプレッソの状態確認']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  'ラテ作成/適切なスチーミング',
  'skill',
  3,
  ARRAY['ワンズの角度', 'ノズルの位置']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  'ラテ作成/スチームミルクの仕上がり',
  'skill',
  3,
  ARRAY['温度', 'キメの細やかさ']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  'ラテ作成/見た目',
  'skill',
  3,
  ARRAY['見た目のきれいさ', 'ツヤがあるか']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '商品を正しい順番で作成できている',
  'skill',
  3,
  ARRAY['注文を確認して順番に作成できる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '全商品を作成できる',
  'skill',
  3,
  ARRAY['ドリンク類', 'フード類']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '機械の操作ができる',
  'skill',
  3,
  ARRAY['エスプレッソ', 'ドリップ', 'オーブン', '電子レンジ']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '立ち振舞い',
  'hospitality',
  3,
  ARRAY['表情', '姿勢', '丁寧な所作', '作業音が小さい']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '感じの良い提供',
  'hospitality',
  3,
  ARRAY['笑顔', 'アイコンタクト', '声のトーン', '挨拶']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  'お見送り',
  'hospitality',
  3,
  ARRAY['お客様が振り返るまで視線を残している']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '声掛け',
  'hospitality',
  3,
  ARRAY['お客様へ提案できている', '困っているお客様への声掛け']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '強力したオペレーション',
  'hospitality',
  3,
  ARRAY['報連相ができる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '消費期限の確認',
  'cleanliness',
  3,
  ARRAY['常に消費期限をチェックしている', '先入先出を理解している']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '作業台の清潔さ',
  'cleanliness',
  3,
  ARRAY['汚れはすぐに拭いている', '片付けながら作業できる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '顔、髪に触れていない',
  'cleanliness',
  3,
  ARRAY['触れてしまった場合には手洗いをして、清潔な状態を維持している']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
  '異物混入への意識',
  'cleanliness',
  3,
  ARRAY['ゴミなどが作業台に無い', '調理器具、容器などの破損がない']
);


INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '経営理念に沿った行動',
  'skill',
  3,
  ARRAY['内容を理解して自らどう行動するか目標にできている']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '出退勤ができる',
  'skill',
  3,
  ARRAY['打刻ルールを理解できている']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  'シフトを期限内に提出できる',
  'skill',
  3,
  ARRAY['遅れる場合の対応']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '早退、欠勤の連絡ができる',
  'skill',
  3,
  ARRAY['当日の場合は電話で連絡', '体調が悪い場合は無理をしない']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '自店舗の正しい情報',
  'skill',
  3,
  ARRAY['電話番号', '住所', '営業時間']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '守秘義務を理解し守っている',
  'skill',
  3,
  ARRAY['売上', 'マニュアル', 'お客様情報']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  'シフトインのときのコーヒーテイスティング',
  'skill',
  3,
  ARRAY['銘柄確認', '味わい確認']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '電話番号対応ができる',
  'skill',
  3,
  ARRAY['お客様対応', '関係者対応', '保留ボタン']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  'アレルギー対応',
  'hospitality',
  3,
  ARRAY['アレルギー一覧表の取扱い', 'コンタミネーションの理解']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '接客用語に間違いは無いか',
  'hospitality',
  3,
  ARRAY['正しい言葉遣い']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  'クレーム対応',
  'hospitality',
  3,
  ARRAY['責任者への報連相', '謝罪の言葉がある']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '従業員同士の声掛け',
  'hospitality',
  3,
  ARRAY['周りの人へのコミュニケーションがある']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '仲間とのやり取り',
  'hospitality',
  3,
  ARRAY['雰囲気作り']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  'ドレスコードを遵守している',
  'cleanliness',
  3,
  ARRAY['髪が目、頬、肩にかかっていない', '爪']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '正しい手洗いができる',
  'cleanliness',
  3,
  ARRAY['手の甲や指と指の間もきれいに洗浄している']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '店内環境の整備',
  'cleanliness',
  3,
  ARRAY['客席の整理整頓/清掃', '室温をチェックしている', 'BGMの音量をチェックしている']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '腸内検査は毎回提出している',
  'cleanliness',
  3,
  ARRAY['期限内に提出しているか']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '厨房内は走らない',
  'cleanliness',
  3,
  ARRAY['早歩きをしている', '急なターンや振り返りが無い']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
  '周囲の安全確認',
  'cleanliness',
  3,
  ARRAY['移動前に周囲を確認する', 'お湯、水など持っていた時は声を掛けている']
);


INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  'POSレジの基本動作',
  'skill',
  3,
  ARRAY['正確に商品を登録できる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '現金での決済ができる',
  'skill',
  3,
  ARRAY['正確な金銭の授受']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  'キャッシュレス決済ができる',
  'skill',
  3,
  ARRAY['クレジット', '電子マネー', 'QR']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '領収書の発行',
  'skill',
  3,
  ARRAY['手書き発行の際は登録番号を記載']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '商品券の取扱い',
  'skill',
  3,
  ARRAY['使用不可の商品券を覚えている']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '感じの良いあいさつ',
  'hospitality',
  3,
  ARRAY['笑顔', '声のトーン', '入退店時の挨拶']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '感じの良い話し方',
  'hospitality',
  3,
  ARRAY['言葉遣い', 'アイコンタクト', '返事、頷きがある']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '立ち振舞い',
  'hospitality',
  3,
  ARRAY['表情', '姿勢', '丁寧な所作']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '心のこもった感謝の言葉',
  'hospitality',
  3,
  ARRAY['笑顔', 'アイコンタクト', '声のトーン']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  'お客様に沿ったおすすめ',
  'hospitality',
  3,
  ARRAY['商品の案内', 'お客様の要望を汲み取れる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  'バリスタとの連携',
  'hospitality',
  3,
  ARRAY['アイコンタクトを取りスムーズなオペレーションができる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  'ショーケース内の整理整頓',
  'cleanliness',
  3,
  ARRAY['パンくず、ガラス面の指紋の清掃']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  'POSレジ周りの整理整頓',
  'cleanliness',
  3,
  ARRAY['ハサミやペンなど散乱していない']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  'POSレジ周りの清掃',
  'cleanliness',
  3,
  ARRAY['POSレジのホコリがない', 'ショーケース上部のホコリがない']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '提供時の消費期限の確認',
  'cleanliness',
  3,
  ARRAY['販売前に確認している']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '異物混入に対しての意識',
  'cleanliness',
  3,
  ARRAY['作業台にゴミがない']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  '動線、転倒防止への配慮',
  'cleanliness',
  3,
  ARRAY['お客様の足元に水滴などがないか', '障害物がないか']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  'お客様情報の保護',
  'cleanliness',
  3,
  ARRAY['クレジット情報を盗み見ていない']
);


INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  'ラテ作成/ドージング',
  'skill',
  3,
  ARRAY['ポータフィルターの状態']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  'ラテ作成/タンピング',
  'skill',
  3,
  ARRAY['粉をならし垂直に力をかけている']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  'ラテ作成/エスプレッソ抽出',
  'skill',
  3,
  ARRAY['抽出後のエスプレッソの状態確認']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  'ラテ作成/適切なスチーミング',
  'skill',
  3,
  ARRAY['ワンズの角度', 'ノズルの位置']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  'ラテ作成/スチームミルクの仕上がり',
  'skill',
  3,
  ARRAY['温度', 'キメの細やかさ']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  'ラテ作成/見た目',
  'skill',
  3,
  ARRAY['見た目のきれいさ', 'ツヤがあるか']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '商品を正しい順番で作成できている',
  'skill',
  3,
  ARRAY['注文を確認して順番に作成できる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '全商品を作成できる',
  'skill',
  3,
  ARRAY['ドリンク類', 'フード類']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '機械の操作ができる',
  'skill',
  3,
  ARRAY['エスプレッソ', 'ドリップ', 'オーブン', '電子レンジ']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '立ち振舞い',
  'hospitality',
  3,
  ARRAY['表情', '姿勢', '丁寧な所作', '作業音が小さい']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '感じの良い提供',
  'hospitality',
  3,
  ARRAY['笑顔', 'アイコンタクト', '声のトーン', '挨拶']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  'お見送り',
  'hospitality',
  3,
  ARRAY['お客様が振り返るまで視線を残している']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '声掛け',
  'hospitality',
  3,
  ARRAY['お客様へ提案できている', '困っているお客様への声掛け']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '強力したオペレーション',
  'hospitality',
  3,
  ARRAY['報連相ができる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '消費期限の確認',
  'cleanliness',
  3,
  ARRAY['常に消費期限をチェックしている', '先入先出を理解している']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '作業台の清潔さ',
  'cleanliness',
  3,
  ARRAY['汚れはすぐに拭いている', '片付けながら作業できる']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '顔、髪に触れていない',
  'cleanliness',
  3,
  ARRAY['触れてしまった場合には手洗いをして、清潔な状態を維持している']
);

INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score,
  check_points
) VALUES (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
  '異物混入への意識',
  'cleanliness',
  3,
  ARRAY['ゴミなどが作業台に無い', '調理器具、容器などの破損がない']
);

