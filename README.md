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

This repo is set up to deploy on Vercel. `vite.config.ts` pins the Nitro preset to `vercel`, so
`vite build` writes a Vercel build output (`.vercel/output`). Inside Lovable the preset is still
pinned to Cloudflare, so Lovable previews keep working.

1. On vercel.com choose **Add New → Project** and import this GitHub repo.
2. Leave the settings on their defaults (build command `vite build`, nothing else to change)
   and click **Deploy**.
3. Add your domain under **Settings → Domains** (e.g. `seeshaun.xyz`) and add the DNS record Vercel shows.

Optional environment variables (Settings → Environment Variables), then redeploy:

| Variable | What it does |
| --- | --- |
| `YOUTUBE_API_KEY` | Shows your live YouTube subscriber count in the Stats section |
| `YOUTUBE_CHANNEL` | Optional override for the channel (defaults to the one in `src/config/site.ts`) |

The live TikTok follower count came from Lovable's connector, which isn't available on Vercel.
The Stats section shows the value in `stats.fallback.tiktokFollowers` in `src/config/site.ts`
instead, so type your current follower count there if you want a number to show.

## Portfolio studio

The redesigned public site uses the portfolio entries from `src/lib/portfolio.ts` as defaults. Visit `/studio` to add or remove videos and projects. Videos can be assigned to **Edits**, **Motion graphics**, or **Other work**, and the public gallery filters by those categories. The studio supports JSON backup export and import.

**Important current limitation:** this initial studio stores edits in the current browser's `localStorage`. It is useful for local preview and prototyping, but changes do not sync to other devices or publish to visitors' browsers. The studio route does not yet have server-side authentication, so do not treat it as a secure admin panel. Before using it as the live CMS, connect a database and server-side sign-in, then deploy with those services configured.

The gallery starts empty instead of presenting stock sample footage as if it were Shaun's actual editing work. Existing project links are retained except for the example-only packs URL.
