import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "@/components/site/icons";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "seeshaun / links" },
      { name: "description", content: "Everywhere to find seeshaun online." },
    ],
  }),
  component: LinksPage,
});

function LinksPage() {
  const { links } = siteConfig;
  return (
    <div className="links-shell">
      <header className="links-header">
        <Link to="/" className="wordmark" aria-label="seeshaun, back to portfolio">
          <img src="/logo.svg" alt="" width="227" height="136" />
        </Link>
        <span>LINK DIRECTORY / 2026</span>
      </header>
      <main className="links-main">
        <div className="links-profile">
          <div className="logo-tile">
            <img src="/logo.svg" alt="seeshaun logo" width="227" height="136" />
          </div>
          <div>
            <p className="section-kicker">CREATOR / EDITOR / BUILDER</p>
            <h1>
              {links.title}
              <span>.</span>
            </h1>
            <p>{links.subtitle}</p>
          </div>
        </div>
        <div className="links-list">
          <p className="links-list-label">
            FIND ME AROUND THE INTERNET <span>01 - 05</span>
          </p>
          {links.items.map((item, index) => (
            <a
              className="link-row"
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="link-row-index">0{index + 1}</span>
              <span className="link-icon">
                <SocialIcon name={item.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="link-label">
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
              <ArrowUpRight size={17} />
            </a>
          ))}
        </div>
        <div className="links-extras">
          <p className="links-list-label">
            OTHER PLACES <span>EXTRAS</span>
          </p>
          {links.extras.map((item) => (
            <a key={item.label} href={item.url} target="_blank" rel="noreferrer">
              {item.label}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </div>
        <div className="links-bottom">
          <span>MADE BY SHAUN / @SEESHAUN</span>
          <Link to="/">
            Back to portfolio <ArrowUpRight size={13} />
          </Link>
        </div>
      </main>
    </div>
  );
}
