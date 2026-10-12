-- Seeshaun Studio backend: Supabase Postgres + Row Level Security.
-- Run this in the Supabase SQL Editor.
-- Public visitors can read published portfolio entries.
-- Only users explicitly listed in studio_admins can create/update/delete entries.

create table if not exists public.studio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.studio_admins enable row level security;

drop policy if exists "Admins can read own membership" on public.studio_admins;
create policy "Admins can read own membership"
  on public.studio_admins
  for select
  to authenticated
  using (auth.uid() = user_id);

create table if not exists public.portfolio_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client text not null default 'PERSONAL',
  type text not null default 'Video',
  src text not null,
  poster text not null default '',
  category text not null check (category in ('Edits', 'Motion graphics', 'Other work')),
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  url text not null,
  tag text not null default 'Project',
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolio_videos enable row level security;
alter table public.portfolio_projects enable row level security;

-- Public read access is limited to published entries.
drop policy if exists "Anyone can read published videos" on public.portfolio_videos;
create policy "Anyone can read published videos"
  on public.portfolio_videos for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Admins can read all videos" on public.portfolio_videos;
create policy "Admins can read all videos"
  on public.portfolio_videos for select
  to authenticated
  using (exists (
    select 1 from public.studio_admins a where a.user_id = auth.uid()
  ));

drop policy if exists "Admins can insert videos" on public.portfolio_videos;
create policy "Admins can insert videos"
  on public.portfolio_videos for insert
  to authenticated
  with check (exists (
    select 1 from public.studio_admins a where a.user_id = auth.uid()
  ));

drop policy if exists "Admins can update videos" on public.portfolio_videos;
create policy "Admins can update videos"
  on public.portfolio_videos for update
  to authenticated
  using (exists (
    select 1 from public.studio_admins a where a.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.studio_admins a where a.user_id = auth.uid()
  ));

drop policy if exists "Admins can delete videos" on public.portfolio_videos;
create policy "Admins can delete videos"
  on public.portfolio_videos for delete
  to authenticated
  using (exists (
    select 1 from public.studio_admins a where a.user_id = auth.uid()
  ));

drop policy if exists "Anyone can read published projects" on public.portfolio_projects;
create policy "Anyone can read published projects"
  on public.portfolio_projects for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Admins can read all projects" on public.portfolio_projects;
create policy "Admins can read all projects"
  on public.portfolio_projects for select
  to authenticated
  using (exists (
    select 1 from public.studio_admins a where a.user_id = auth.uid()
  ));

drop policy if exists "Admins can insert projects" on public.portfolio_projects;
create policy "Admins can insert projects"
  on public.portfolio_projects for insert
  to authenticated
  with check (exists (
    select 1 from public.studio_admins a where a.user_id = auth.uid()
  ));

drop policy if exists "Admins can update projects" on public.portfolio_projects;
create policy "Admins can update projects"
  on public.portfolio_projects for update
  to authenticated
  using (exists (
    select 1 from public.studio_admins a where a.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.studio_admins a where a.user_id = auth.uid()
  ));

drop policy if exists "Admins can delete projects" on public.portfolio_projects;
create policy "Admins can delete projects"
  on public.portfolio_projects for delete
  to authenticated
  using (exists (
    select 1 from public.studio_admins a where a.user_id = auth.uid()
  ));

-- Helpful ordering indexes for the public gallery.
create index if not exists portfolio_videos_public_order_idx
  on public.portfolio_videos (published, sort_order, created_at desc);
create index if not exists portfolio_projects_public_order_idx
  on public.portfolio_projects (published, sort_order, created_at desc);

-- Optional starter projects (real links already used by the site; no sample videos).
insert into public.portfolio_projects (title, description, url, tag, sort_order)
select 'My Proxy', 'A web proxy I built and host for friends and the community.', 'https://proxy.seeshaun.xyz', 'Web', 10
where not exists (select 1 from public.portfolio_projects where url = 'https://proxy.seeshaun.xyz');

insert into public.portfolio_projects (title, description, url, tag, sort_order)
select 'Roblox Funk Editors Top 30', 'A ranked list of Roblox funk editors, split by editing style.', 'https://robloxeditorslist.seeshaun.xyz', 'List', 20
where not exists (select 1 from public.portfolio_projects where url = 'https://robloxeditorslist.seeshaun.xyz');

insert into public.portfolio_projects (title, description, url, tag, sort_order)
select 'Links Hub', 'Every link of mine in one place.', '/links', 'Hub', 30
where not exists (select 1 from public.portfolio_projects where url = '/links');
