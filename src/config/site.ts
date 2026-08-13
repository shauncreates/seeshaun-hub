/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit everything here (links, videos, stats).
 * ─────────────────────────────────────────────────────────────
 */

export type SocialKey =
  | "tiktok"
  | "youtube"
  | "instagram"
  | "discord"
  | "spotify"
  | "github"
  | "steam";

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
    { label: "Playlists", href: "#playlists" },
    { label: "Stats", href: "#stats" },
  ],

  socials: [
    { key: "tiktok" as SocialKey, label: "TikTok", url: "https://tiktok.com/@seeshaun" },
    { key: "youtube" as SocialKey, label: "YouTube", url: "https://youtube.com/@seeshaun" },
    { key: "instagram" as SocialKey, label: "Instagram", url: "https://instagram.com/seeshaun" },
    { key: "discord" as SocialKey, label: "Discord", url: "https://discord.gg/seeshaun" },
    { key: "spotify" as SocialKey, label: "Spotify", url: "https://open.spotify.com/user/seeshaun" },
    { key: "github" as SocialKey, label: "GitHub", url: "https://github.com/seeshaun" },
    { key: "steam" as SocialKey, label: "Steam", url: "https://steamcommunity.com/id/seeshaun" },
  ],

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
      url: "https://example.com/proxy",
      tag: "Web",
    },
    {
      title: "Links Hub",
      description: "One page with every socials link, commission form and pricing.",
      url: "https://example.com/links",
      tag: "Hub",
    },
    {
      title: "Edit Presets / Packs",
      description: "After Effects presets, transitions, overlays and SFX packs I use daily.",
      url: "https://example.com/packs",
      tag: "Downloads",
    },
    {
      title: "Discord Server",
      description: "Editing help, feedback channels, free assets and commission drops.",
      url: "https://discord.gg/seeshaun",
      tag: "Community",
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

  playlists: [
    {
      title: "Edit Fuel",
      description: "Phonk, hyperpop and hard drums — what I loop while cutting.",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd",
      tracks: 84,
    },
    {
      title: "Slowed & Reverb",
      description: "Ambient and slowed edits for cinematic sequences.",
      url: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
      tracks: 52,
    },
    {
      title: "Transition SFX",
      description: "Whooshes, risers and impacts I drop into every project.",
      url: "https://open.spotify.com/playlist/37i9dQZF1DX4dyzvuaRJ0n",
      tracks: 31,
    },
  ],

  stats: [
    { label: "TikTok Followers", value: "128K" },
    { label: "YouTube Subscribers", value: "42.6K" },
    { label: "Discord Members", value: "9,340" },
    { label: "Projects Built", value: "260+" },
  ],

  footerLinks: [
    { label: "Terms", url: "#" },
    { label: "Privacy", url: "#" },
    { label: "Licensing", url: "#" },
  ],
};

export type SiteConfig = typeof siteConfig;
