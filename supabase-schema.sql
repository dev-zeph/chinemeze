-- Run this in your Supabase SQL editor

-- to force redeployment.

create table condolences (
  id bigint primary key generated always as identity,
  name text not null,
  message text not null,
  created_at timestamptz default now() not null
);

-- Allow public reads and inserts (no auth required)
alter table condolences enable row level security;

create policy "Anyone can read condolences"
  on condolences for select
  to anon
  using (true);

create policy "Anyone can insert condolences"
  on condolences for insert
  to anon
  with check (true);
