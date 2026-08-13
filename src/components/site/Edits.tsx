import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "./SectionHeading";
import banner from "@/assets/hero-banner.jpg";

type Edit = (typeof siteConfig.edits)[number];

export function Edits() {
  const [active, setActive] = useState<Edit | null>(null);

  return (
    <section id="edits" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16">
      <SectionHeading
        eyebrow="Portfolio"
        title="Video Portfolio / After Effects Work"
        description="Click any card to watch the edit right here."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.edits.map((edit) => (
          <button
            key={edit.title}
            onClick={() => setActive(edit)}
            className="panel card-hover group relative overflow-hidden rounded-2xl text-left"
          >
            <video
              src={edit.src}
              poster={edit.poster || banner}
              muted
              loop
              playsInline
              preload="metadata"
              className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onMouseEnter={(e) => void e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-background/70 text-primary opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Play className="h-4 w-4" />
            </span>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <div>
                <p className="font-display text-sm font-semibold">{edit.title}</p>
                <p className="text-[11px] text-muted-foreground">{edit.type}</p>
              </div>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                {edit.client}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl overflow-hidden border-border bg-card p-0">
          <DialogTitle className="sr-only">{active?.title ?? "Edit"}</DialogTitle>
          {active ? (
            <>
              <video
                src={active.src}
                poster={active.poster || banner}
                controls
                autoPlay
                className="aspect-video w-full bg-background"
              />
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="font-display font-semibold">{active.title}</p>
                  <p className="text-xs text-muted-foreground">{active.type}</p>
                </div>
                <span className="text-xs text-primary">{active.client}</span>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
