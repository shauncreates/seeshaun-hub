import { createServerFn } from "@tanstack/react-start";

export type SocialStats = {
  tiktokFollowers: number | null;
  youtubeSubscribers: number | null;
};

export const getSocialStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<SocialStats> => {
    const [tiktokFollowers, youtubeSubscribers] = await Promise.all([
      fetchTikTokFollowers(),
      fetchYouTubeSubscribers(),
    ]);
    return { tiktokFollowers, youtubeSubscribers };
  },
);

async function fetchTikTokFollowers(): Promise<number | null> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const tiktokKey = process.env["TIKTOK_API_KEY"];
  if (!lovableKey || !tiktokKey) return null;

  const res = await fetch(
    "https://connector-gateway.lovable.dev/tiktok/user/info/?fields=follower_count",
    {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": tiktokKey,
      },
    },
  );
  if (!res.ok) {
    console.error(`TikTok stats failed [${res.status}]: ${await res.text()}`);
    return null;
  }
  const json = (await res.json()) as { data?: { user?: { follower_count?: number } } };
  return json.data?.user?.follower_count ?? null;
}

async function fetchYouTubeSubscribers(): Promise<number | null> {
  const key = process.env["YOUTUBE_API_KEY"];
  const channel = process.env["YOUTUBE_CHANNEL"] ?? "seeshaun";
  if (!key) return null;

  const param = channel.startsWith("UC")
    ? `id=${encodeURIComponent(channel)}`
    : `forHandle=${encodeURIComponent(channel.replace(/^@/, ""))}`;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&${param}&key=${key}`,
  );
  if (!res.ok) {
    console.error(`YouTube stats failed [${res.status}]: ${await res.text()}`);
    return null;
  }
  const json = (await res.json()) as {
    items?: Array<{ statistics?: { subscriberCount?: string } }>;
  };
  const count = json.items?.[0]?.statistics?.subscriberCount;
  if (!count) {
    console.error(`YouTube channel "${channel}" returned no statistics.`);
    return null;
  }
  return Number(count);
}
