
-- profilesテーブル作成
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text not null,
  role text not null check (role in ('admin', 'staff')),
  store_name text not null,
  avatar_url text,
  is_demo boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- インデックス作成
create index profiles_email_idx on profiles(email);
create index profiles_role_idx on profiles(role);

-- RLSを有効化
alter table profiles enable row level security;

-- ポリシー 自分のプロフィールを閲覧できる
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

--ポリシー 自分のプロフィールを更新できる
create policy "User can  update own profile"
  on profiles for update
  using (auth.uid() = id);

-- update_atを自動更新する関数
create or replace function update_updated_at_column()
  returns trigger as $$
  begin
    new.updated_at = now();
    return new;
  end;
  $$ language plpgsql;

-- updated_at自動更新トリガー
create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();

--トリガー関数 新規ユーザー作成時にprifilesも作成
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role, store_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    'admin',
    new.raw_user_meta_data->>'store_name'
  );
  return new;
end;
$$ language plpgsql security definer;

-- トリガー auth.usersにinsertされたら実行
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();



