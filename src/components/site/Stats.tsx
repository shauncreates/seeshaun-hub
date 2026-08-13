import { siteConfig } from "@/config/site";
import { SectionHeading } from "./SectionHeading";

export function Stats() {
  return (
    <section id="stats" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16">
      <SectionHeading eyebrow="Numbers" title="Stats & Platforms" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.stats.map((s) => (
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
