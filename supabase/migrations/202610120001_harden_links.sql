-- Optional hardening: only allow normal web links or site paths in portfolio entries.
-- Run in the Supabase SQL Editor after 202610110001_studio_portfolio.sql.
alter table public.portfolio_projects
  add constraint projects_url_safe check (url ~* '^(https?://|/)');

alter table public.portfolio_videos
  add constraint videos_src_safe check (src ~* '^https?://'),
  add constraint videos_poster_safe check (poster = '' or poster ~* '^https?://');
