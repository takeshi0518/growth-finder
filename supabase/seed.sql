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
  false
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
  true
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