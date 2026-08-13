import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16">
      <SectionHeading
        eyebrow="Featured"
        title="Projects & Resources"
        description="Tools, packs and places I build and maintain."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.projects.map((p) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="panel card-hover group flex flex-col rounded-2xl p-5"
          >
            <span className="w-fit rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
              {p.tag}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Open
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
