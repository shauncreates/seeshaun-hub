import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { siteConfig } from "@/config/site";
import { getSocialStats } from "@/lib/stats.functions";
import { SectionHeading } from "./SectionHeading";

function format(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString();
}

export function Stats() {
  const fetchStats = useServerFn(getSocialStats);
  const { data } = useQuery({
    queryKey: ["social-stats"],
    queryFn: () => fetchStats(),
    staleTime: 5 * 60 * 1000,
  });

  const items = [
    {
      label: "TikTok Followers",
      value:
        data?.tiktokFollowers != null
          ? format(data.tiktokFollowers)
          : siteConfig.stats.fallback.tiktokFollowers,
    },
    {
      label: "YouTube Subscribers",
      value:
        data?.youtubeSubscribers != null
          ? format(data.youtubeSubscribers)
          : siteConfig.stats.fallback.youtubeSubscribers,
    },
  ];

  return (
    <section id="stats" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16">
      <SectionHeading
        eyebrow="Numbers"
        title="Stats & Platforms"
        description="Live from my connected TikTok and YouTube accounts."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((s) => (
          <div key={s.label} className="panel card-hover rounded-2xl p-6 text-center">
            <p className="font-display text-4xl font-bold text-glow">{s.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
