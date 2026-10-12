# Seeshaun Studio backend setup (Supabase)

This starter adds the database schema and typed client helpers for replacing the current browser-only `/studio` storage with a shared database. It is a backend foundation, not yet a finished UI integration.

## 1. Install the client library

From the repository root:

```bash
npm install @supabase/supabase-js
```

## 2. Create the Supabase project

1. Create a Supabase project at https://supabase.com/.
2. In **Project Settings → API**, copy the Project URL and publishable/anon key.
3. In **Authentication → Providers**, enable Email/password.
4. Disable public sign-ups. Create your own admin user from the Supabase dashboard instead.

Never put a `service_role` key in a `VITE_` variable or frontend code. The publishable/anon key is intended to be exposed in the browser; the SQL Row Level Security policies enforce permissions.

## 3. Apply the database migration

Open the Supabase SQL Editor and run `supabase/migrations/202610110001_studio_portfolio.sql`.

Then create your admin account in Supabase Authentication and copy its user UUID. Run this in the SQL Editor, replacing the placeholder:

```sql
insert into public.studio_admins (user_id)
values ('PASTE-YOUR-AUTH-USER-UUID-HERE');
```

Only user IDs explicitly inserted into `studio_admins` can manage portfolio entries. There is intentionally no public policy allowing anyone to add themselves as an admin.

## 4. Configure local development

Create a `.env.local` file at the repository root:

```dotenv
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Restart `npm run dev` after changing environment variables. Add the same two values to your hosting provider's environment variables before deploying, then redeploy.

## 5. What the backend provides

- Shared Postgres tables for portfolio videos and projects.
- Public read access only for published entries.
- Database-enforced write access for explicitly approved Studio admins.
- Email/password sign-in helpers and admin-membership verification.
- No service-role key in the browser.

## Important integration note

The current `src/routes/studio.tsx` and homepage still use the existing `localStorage` workflow until their UI is connected to these helpers. Do not delete local backups yet. After the integration is merged, test adding a video, deleting a project, signing out, and confirming that public visitors can only see published entries.
