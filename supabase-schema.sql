-- Run this in your Supabase SQL editor

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

-- ─── Gallery Storage ───────────────────────────────────────────────────────────
-- Run these in Supabase Dashboard → Storage → New bucket
-- OR paste the SQL below into the SQL editor

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true);

-- Allow anyone to view photos
create policy "Public read gallery"
  on storage.objects for select
  to anon
  using (bucket_id = 'gallery');

-- Allow anyone to upload photos
create policy "Public upload gallery"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'gallery');
