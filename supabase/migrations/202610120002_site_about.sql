-- Editable "About me" text for the homepage. One row only (id = 1).
-- Run in the Supabase SQL Editor. Anyone can read it; only studio_admins can change it.

create table if not exists public.site_about (
  id integer primary key default 1 check (id = 1),
  heading text not null default '' check (char_length(heading) <= 80),
  accent text not null default '' check (char_length(accent) <= 80),
  body text not null default '' check (char_length(body) <= 2000),
  updated_at timestamptz not null default now()
);

alter table public.site_about enable row level security;

drop policy if exists "Anyone can read about" on public.site_about;
create policy "Anyone can read about"
  on public.site_about for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert about" on public.site_about;
create policy "Admins can insert about"
  on public.site_about for insert
  to authenticated
  with check (exists (select 1 from public.studio_admins a where a.user_id = auth.uid()));

drop policy if exists "Admins can update about" on public.site_about;
create policy "Admins can update about"
  on public.site_about for update
  to authenticated
  using (exists (select 1 from public.studio_admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.studio_admins a where a.user_id = auth.uid()));

-- Starting text, the same as what the site shows now. Safe to run twice.
insert into public.site_about (id, heading, accent, body)
values (
  1,
  'Hey, I’m Shaun.',
  'I make stuff.',
  'I’m a creator focused on punchy video edits, motion design and the little details that make a piece feel alive. I like learning how things work just as much as making them look good.'
)
on conflict (id) do nothing;
