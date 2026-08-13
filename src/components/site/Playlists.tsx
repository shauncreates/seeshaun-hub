import { ArrowUpRight, Music } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "./SectionHeading";

export function Playlists() {
  return (
    <section id="playlists" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16">
      <SectionHeading
        eyebrow="On Repeat"
        title="Playlists"
        description="The sound behind the cuts."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {siteConfig.playlists.map((pl) => (
          <a
            key={pl.title}
            href={pl.url}
            target="_blank"
            rel="noreferrer"
            className="panel card-hover flex items-start gap-4 rounded-2xl p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
              <Music className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-semibold">{pl.title}</h3>
                <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{pl.description}</p>
              <p className="mt-3 text-[11px] uppercase tracking-widest text-primary">
                {pl.tracks} tracks
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
