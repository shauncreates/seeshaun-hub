/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit everything here (links, videos, stats).
 * ─────────────────────────────────────────────────────────────
 */

export type SocialKey = "tiktok" | "youtube" | "instagram" | "discord" | "spotify" | "github";

export const siteConfig = {
  name: "shaun",
  handle: "@seeshaun",
  tagline: "Video Editor & Creator | Motion Graphics & Transition Edits",
  bio: "I cut fast, punchy edits — transitions, motion graphics and sound design for creators, gaming clips and brands. Available for commissions.",
  contactUrl: "https://discord.com/users/000000000000000000",
  contactLabel: "Contact / DM",
  copyright: "© 2026 seeshaun",

  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Edits", href: "#edits" },
    { label: "Stats", href: "#stats" },
  ],

  socials: [
    { key: "tiktok" as SocialKey, label: "TikTok", url: "https://tiktok.com/@seeshaun" },
    { key: "youtube" as SocialKey, label: "YouTube", url: "https://youtube.com/@seeshaun" },
    { key: "instagram" as SocialKey, label: "Instagram", url: "https://instagram.com/seeshaun" },
    { key: "spotify" as SocialKey, label: "Spotify", url: "https://open.spotify.com/user/seeshaun" },
    { key: "github" as SocialKey, label: "GitHub", url: "https://github.com/seeshaun" },
  ],

  /**
   * Linktree-style page at /links — add, remove or reorder freely.
   * `featured: true` gives the row a highlighted/glowing style.
   */
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
        url: "https://youtube.com/@seeshaun",
        icon: "youtube" as SocialKey,
      },
      {
        label: "Instagram",
        description: "Behind the scenes",
        url: "https://instagram.com/seeshaun",
        icon: "instagram" as SocialKey,
      },
      {
        label: "Spotify",
        description: "What I loop while editing",
        url: "https://open.spotify.com/user/seeshaun",
        icon: "spotify" as SocialKey,
      },
      {
        label: "GitHub",
        description: "Code, tools and experiments",
        url: "https://github.com/seeshaun",
        icon: "github" as SocialKey,
      },
    ],
    /** Extra plain buttons (no social icon) shown under the socials. */
    extras: [
      { label: "My Proxy", url: "https://proxy.seeshaun.xyz" },
      { label: "Commission / DM me", url: "https://discord.com/users/000000000000000000" },
    ],
  },

  /** Background/featured video in the hero banner. */
  featuredVideo: {
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "", // leave empty to use the bundled hero banner image
    title: "Showreel 2026",
    subtitle: "Transitions · Motion graphics · Sound design",
  },

  projects: [
    {
      title: "My Proxy",
      description: "Fast, private proxy I built and host for friends and the community.",
      url: "https://proxy.seeshaun.xyz",
      tag: "Web",
    },
    {
      title: "Links Hub",
      description: "One page with every socials link, commission form and pricing.",
      url: "/links",
      tag: "Hub",
    },
    {
      title: "Edit Presets / Packs",
      description: "After Effects presets, transitions, overlays and SFX packs I use daily.",
      url: "https://example.com/packs",
      tag: "Downloads",
    },
  ],

  /** Video portfolio — swap `src` for your own mp4 links. */
  edits: [
    {
      title: "Neon Drift Edit",
      client: "@velocity",
      type: "AMV / Car Edit",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      poster: "",
    },
    {
      title: "Velocity Montage",
      client: "@kaze",
      type: "Gaming Montage",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      poster: "",
    },
    {
      title: "Chroma Transitions",
      client: "@luma",
      type: "After Effects",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      poster: "",
    },
    {
      title: "Brand Promo Cut",
      client: "@northwave",
      type: "Commercial",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      poster: "",
    },
    {
      title: "Anime Beat Sync",
      client: "@sora",
      type: "Beat Sync",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "",
    },
    {
      title: "Clip Highlight Reel",
      client: "@rev",
      type: "Highlights",
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "",
    },
  ],

  /**
   * Live stats. Values are pulled from the connected TikTok account and the
   * YouTube channel below; `fallback` is shown while loading or if a platform
   * is not connected yet.
   */
  stats: {
    /** YouTube handle (without @) or channel ID starting with UC… */
    youtubeChannel: "seeshaun",
    fallback: {
      tiktokFollowers: "—",
      youtubeSubscribers: "—",
    },
  },

  footerLinks: [
    { label: "Links", url: "/links" },
    { label: "Terms", url: "#" },
    { label: "Privacy", url: "#" },
  ],
};

export type SiteConfig = typeof siteConfig;
