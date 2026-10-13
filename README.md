# Shaun's Creator Hub

Build a modern, dark-mode personal creator & video editor portfolio website inspired by itzcrih.it. The design should feel sleek, premium, and tailored for a video editor/content creator. Use a deep dark background (#090d10 or #050505) with subtle neon green/emerald glow accents.

1. Header & Navigation:

A sticky top navigation bar with a glowing title "shaun" and navigation links: Projects, Edits, Playlists, Stats, and a Contact / DM button.

2. Hero / Bio Section:

Profile card containing a rounded avatar/logo with a subtle green border glow.

Name: shaun

Tagline: "Video Editor & Creator | Motion Graphics & Transition Edits"

Social icon badges with hover effects linking to: TikTok, YouTube, Instagram, Discord, Spotify, GitHub, and Steam.

Featured video banner or background video player with a play/mute toggle.

3. Featured Projects Grid:

Clean card layout showcasing key tools or links (e.g. "My Proxy", "Links Hub", "Edit Presets / Packs", "Discord Server") with hover glow, brief descriptions, and 'Open →' call-to-action buttons.

4. After Effects / Video Edits Gallery:

Grid section titled "Video Portfolio / After Effects Work".

Cards for video edits with video thumbnail previews, client tags (e.g., @username), and a video modal player (or embedded HTML5 video player) when clicked to watch the edit directly.

5. Stats & Platforms Counters:

Grid boxes displaying statistics: TikTok Followers, YouTube Subscribers, Discord Members, and Projects Built.

7. Footer:

Copyright info (© 2026 seeshaun), legal/terms placeholders, and a quick 'Back to Top' button.

Make sure all video links, social URLs and text descriptions are stored cleanly in a single configuration file or state object so I can easily update them with my own links and edits.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a83c72ad-80b7-4618-877d-bc417fc9850c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploying on Vercel

This project is configured for Vercel through the Nitro Vercel preset in `vite.config.ts`.

1. Push this project to a GitHub repository and import that repository in Vercel (**Add New → Project**).
2. Use the detected settings. The build command is `npm run build` (equivalent to `vite build`); do not set a static output directory.
3. In Vercel, open **Project → Settings → Environment Variables** and add:
   - `VITE_SUPABASE_URL` — your Supabase project URL.
   - `VITE_SUPABASE_ANON_KEY` — your Supabase publishable/anon key only. Never use a service-role key in a `VITE_` variable.
4. Apply the SQL migrations in `supabase/migrations` to the same Supabase project if you have not already done so. Confirm Row Level Security policies are enabled.
5. Redeploy after setting the variables. Test `/`, `/links`, and `/studio` on the deployed domain.
6. Add your custom domain under **Settings → Domains** in Vercel and follow the DNS instructions shown there.

Optional variables used by the stats feature:

| Variable          | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| `YOUTUBE_API_KEY` | Server-side YouTube subscriber count, if enabled. |
| `YOUTUBE_CHANNEL` | Optional YouTube channel override.                |

Do not commit `.env.local` or other environment files. `.env.example` contains placeholders only.

## Portfolio studio

The public homepage loads published videos, projects, and About content from Supabase. Sign in at `/studio` using a Supabase Auth account that has a matching row in `studio_admins`. The Studio can add and delete videos and projects; the homepage displays published entries.

Video URLs can be direct playable video files, YouTube links, or supported TikTok video links. Embedding may be disabled for individual third-party videos. Keep the Supabase Row Level Security policies enabled and only add trusted user IDs to `studio_admins`.
