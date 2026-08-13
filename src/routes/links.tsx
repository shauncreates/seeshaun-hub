import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "@/components/site/icons";
import avatar from "@/assets/avatar.jpg";

const title = "seeshaun — All my links";
const description =
  "Every link in one place: TikTok, YouTube, Instagram, Spotify, GitHub, my proxy and commissions.";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LinksPage,
});

function LinksPage() {
  const { links } = siteConfig;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />

      <main className="relative mx-auto w-full max-w-md px-5 py-16">
        <div className="flex flex-col items-center text-center">
          <img
            src={avatar}
            alt="shaun logo"
            width={768}
            height={768}
            className="h-24 w-24 rounded-3xl border border-primary/50 object-cover shadow-glow"
          />
          <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-glow">
            {links.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{links.subtitle}</p>
        </div>

        <div className="mt-9 space-y-3">
          {links.items.map((item) => (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`panel card-hover flex items-center gap-4 rounded-2xl px-4 py-3.5 ${
                item.featured ? "border-primary/50 shadow-glow" : ""
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                <SocialIcon name={item.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-sm font-semibold">{item.label}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {item.description}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-primary" />
            </a>
          ))}

          {links.extras.map((item) => (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="glow-ring flex items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="text-xs text-muted-foreground transition-colors hover:text-primary">
            ← Back to portfolio
          </Link>
        </div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground">{siteConfig.copyright}</p>
      </main>
    </div>
  );
}
