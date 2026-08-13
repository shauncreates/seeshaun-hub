import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          {siteConfig.copyright} — all edits and assets remain property of their owners.
        </p>

        <div className="flex items-center gap-4">
          {siteConfig.footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.url}
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
          >
            <ArrowUp className="h-3.5 w-3.5" /> Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
