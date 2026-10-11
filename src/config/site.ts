/**
 * SITE CONFIG: edit your links and projects here.
 */

export type SocialKey = "tiktok" | "youtube" | "instagram" | "discord" | "spotify" | "github";

export const siteConfig = {
  name: "shaun",
  handle: "@seeshaun",
  tagline: "Video Editor & Creator | Motion Graphics & Transition Edits",
  bio: "I cut fast, punchy edits: transitions, motion graphics and sound design for creators, gaming clips and brands. Available for commissions.",
  contactUrl: "https://discord.com/users/527986426101497866",
  copyright: "© 2026 seeshaun",

  socials: [
    { key: "tiktok" as SocialKey, label: "TikTok", url: "https://tiktok.com/@seeshaun" },
    { key: "youtube" as SocialKey, label: "YouTube", url: "https://www.youtube.com/@shaun_vfx" },
    { key: "instagram" as SocialKey, label: "Instagram", url: "https://www.instagram.com/shaun_vfx" },
    { key: "spotify" as SocialKey, label: "Spotify", url: "https://open.spotify.com/user/31pys274hbig3wp7lrtd6bvjy3si" },
    { key: "github" as SocialKey, label: "GitHub", url: "https://github.com/shauncreates" },
  ],

  /** Link-in-bio page at /links. Add, remove or reorder freely. */
  links: {
    title: "seeshaun",
    subtitle: "Video editor · motion graphics · commissions open",
    items: [
      {
        label: "TikTok",
        description: "Daily edits & clips",
        url: "https://tiktok.com/@seeshaun",
        icon: "tiktok" as SocialKey,
        featured: true,
      },
      {
        label: "YouTube",
        description: "Showreels and long-form edits",
        url: "https://www.youtube.com/@shaun_vfx",
        icon: "youtube" as SocialKey,
      },
      {
        label: "Instagram",
        description: "Behind the scenes",
        url: "https://www.instagram.com/shaun_vfx",
        icon: "instagram" as SocialKey,
      },
      {
        label: "Spotify",
        description: "What I loop while editing",
        url: "https://open.spotify.com/user/31pys274hbig3wp7lrtd6bvjy3si",
        icon: "spotify" as SocialKey,
      },
      {
        label: "GitHub",
        description: "Code, tools and experiments",
        url: "https://github.com/shauncreates",
        icon: "github" as SocialKey,
      },
    ],
    /** Extra plain buttons (no social icon) shown under the socials. */
    extras: [
      { label: "My Proxy", url: "https://proxy.seeshaun.xyz" },
      { label: "Commission / DM me", url: "https://discord.com/users/527986426101497866" },
      { label: "Roblox Funk Editors Top 30", url: "https://robloxeditorslist.seeshaun.xyz" },
    ],
  },

  projects: [
    {
      title: "My Proxy",
      description: "A web proxy I built and host for friends and the community.",
      url: "https://proxy.seeshaun.xyz",
      tag: "Web",
    },
    {
      title: "Roblox Funk Editors Top 30",
      description: "A ranked list of Roblox funk editors, split by editing style.",
      url: "https://robloxeditorslist.seeshaun.xyz",
      tag: "List",
    },
    {
      title: "Links Hub",
      description: "Every link of mine in one place.",
      url: "/links",
      tag: "Hub",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
