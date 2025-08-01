-- lead 테이블
create table if not exists lead (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  program text,
  created_at timestamp with time zone default now(),
  user_id uuid references auth.users(id)
);

-- RLS 활성화 및 정책
alter table lead enable row level security;
create policy "Users can view their own leads"
  on lead for select
  using (auth.uid() = user_id);
create policy "Users can insert their own leads"
  on lead for insert
  with check (auth.uid() = user_id);

-- (다른 테이블도 위와 같은 방식으로 추가)
