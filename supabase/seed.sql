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