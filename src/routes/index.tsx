import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Play, MoveUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { defaultAbout, defaultPortfolio, type AboutContent, type PortfolioData, type PortfolioVideo } from "@/lib/portfolio";
import { fetchAbout, fetchPublicPortfolio } from "@/lib/studio-backend";
import { SocialIcon } from "@/components/site/icons";

const title = "seeshaun | Editor, motion designer, internet person";
const description = "Selected edits, motion experiments and projects by seeshaun.";

function getVideoSource(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, "");

    if (
      ["youtube.com", "m.youtube.com", "youtu.be", "youtube-nocookie.com"].includes(host)
    ) {
      const id =
        host === "youtu.be"
          ? url.pathname.split("/").filter(Boolean)[0]
          : url.searchParams.get("v") ??
            url.pathname.match(/^\/(?:shorts|embed|live)\/([^/?]+)/)?.[1];

      if (id) {
        return {
          type: "youtube" as const,
          id,
          embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`,
        };
      }
    }

    if (host === "tiktok.com" || host.endsWith(".tiktok.com")) {
      const id =
        url.pathname.match(/\/video\/(\d+)/)?.[1] ??
        url.pathname.match(/\/player\/v1\/(\d+)/)?.[1];

      if (id) {
        return {
          type: "tiktok" as const,
          embedUrl: `https://www.tiktok.com/player/v1/${id}?autoplay=1`,
        };
      }

      return { type: "unsupported" as const };
    }

    return { type: "file" as const };
  } catch {
    return { type: "file" as const };
  }
}

function PortfolioVideoPlayer({ video }: { video: PortfolioVideo }) {
  const source = getVideoSource(video.src);

  if (source.type === "youtube" || source.type === "tiktok") {
    return (
      <iframe
        src={source.embedUrl}
        title={video.title}
        allow="autoplay; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        className={source.type === "tiktok" ? "embed-frame embed-tiktok" : "embed-frame embed-youtube"}
      />
    );
  }

  if (source.type === "unsupported") {
    return (
      <p className="embed-note">
        This TikTok link could not be embedded. Open the video on TikTok,
        copy its full video URL, and paste that into Studio.
      </p>
    );
  }

  return (
    <video
      src={video.src}
      poster={video.poster || undefined}
      controls
      autoPlay
      playsInline
    />
  );
}

function VideoThumb({ video }: { video: PortfolioVideo }) {
  const source = getVideoSource(video.src);
  if (source.type === "file") {
    return (
      <video
        src={video.src}
        poster={video.poster || undefined}
        muted
        loop
        playsInline
        preload="metadata"
        onMouseEnter={(event) => void event.currentTarget.play().catch(() => {})}
        onMouseLeave={(event) => {
          event.currentTarget.pause();
          event.currentTarget.currentTime = 0;
        }}
      />
    );
  }
  // Your own thumbnail wins; otherwise YouTube's real thumbnail; otherwise a plain dark tile.
  const image =
    video.poster || (source.type === "youtube" ? `https://i.ytimg.com/vi/${encodeURIComponent(source.id)}/hqdefault.jpg` : "");
  return image ? (
    <img className="work-thumb" src={image} alt="" loading="lazy" />
  ) : (
    <div className="video-placeholder" aria-hidden="true">
      <Play size={28} />
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});

function Index() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(defaultPortfolio);
  const [about, setAbout] = useState<AboutContent>(defaultAbout);
  const [filter, setFilter] = useState("All work");
  const [active, setActive] = useState<PortfolioVideo | null>(null);
useEffect(() => {
  let cancelled = false;

  fetchPublicPortfolio()
    .then((data) => {
      if (!cancelled) {
        setPortfolio(data);
      }
    })
    .catch((error) => {
      console.error("Failed to load portfolio from Supabase:", error);
    });

  fetchAbout()
    .then((content) => {
      if (!cancelled) setAbout(content);
    })
    .catch((error) => {
      console.error("Failed to load About text from Supabase:", error);
    });

  return () => {
    cancelled = true;
  };
}, []);
  // Escape closes the video dialog, like any modal should.
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
  const videos = useMemo(() => filter === "All work" ? portfolio.videos : portfolio.videos.filter((video) => video.category === filter), [filter, portfolio.videos]);

  return <div className="site-shell">
    <header className="site-header"><a className="wordmark" href="#about" aria-label="seeshaun, about section"><img src="/logo.svg" alt="" width="227" height="136"/></a><nav aria-label="Main navigation"><a href="#about">About</a><a href="#work">Work</a><a href="#projects">Projects</a><Link to="/links">Links <ArrowUpRight size={13}/></Link></nav><a className="header-contact" href={siteConfig.contactUrl} target="_blank" rel="noreferrer">Let’s talk <MoveUpRight size={14}/></a></header>
    <main>
      <section className="about-section section-wrap" id="about"><div className="about-portrait" data-reveal><div className="logo-tile"><img src="/logo.svg" alt="seeshaun logo" width="227" height="136"/></div><span>MAKING THINGS / MOST DAYS</span></div><div className="about-copy" data-reveal style={{ "--i": 1 } as CSSProperties}><p className="section-kicker">01 / A LITTLE CONTEXT</p><h2>{about.heading}<br/><em>{about.accent}</em></h2>{about.body.split(/\n\s*\n/).filter((part) => part.trim()).map((part, index) => <p key={index}>{part.trim()}</p>)}<div className="social-row">{siteConfig.socials.map((social) => <a key={social.key} href={social.url} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}><SocialIcon name={social.key} className="h-[17px] w-[17px]"/></a>)}</div></div></section>

      <section className="work-section section-wrap" id="work"><div className="section-top" data-reveal><div><p className="section-kicker">02 / THE OUTPUT</p><h2>Selected <em>work</em></h2></div><p className="section-note">A collection of edits, motion tests<br/>and things made to hit on beat.</p></div>
        <div className="work-toolbar" data-reveal><div className="filter-tabs" aria-label="Filter work">{["All work", "Edits", "Motion graphics", "Other work"].map((item) => <button key={item} className={filter === item ? "filter-tab active" : "filter-tab"} onClick={() => setFilter(item)}>{item}<span>{item === "All work" ? portfolio.videos.length : portfolio.videos.filter((v) => v.category === item).length.toString().padStart(2, "0")}</span></button>)}</div><span className="work-count">{videos.length.toString().padStart(2, "0")} PIECES</span></div>
        {videos.length ? <div className="work-grid">{videos.map((video, index) => <button data-reveal style={{ "--i": index % 3 } as CSSProperties} className={`work-item work-item-${index % 3}`} key={video.id} onClick={() => setActive(video)}><div className="work-media"><VideoThumb video={video} /><span className="play-mark"><Play size={16} fill="currentColor"/></span><span className="media-index">{String(index + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}</span></div><div className="work-meta"><div><p className="work-type">{video.category} / {video.type}</p><h3>{video.title}</h3></div><span className="work-client">{video.client || "PERSONAL"}<ArrowUpRight size={14}/></span></div></button>)}</div> : <div className="empty-work">Nothing in this section yet. New work will show up here when it is published.</div>}
      </section>

      <section className="projects-section section-wrap" id="projects"><div className="section-top" data-reveal><div><p className="section-kicker">03 / OUTSIDE THE TIMELINE</p><h2>Other <em>projects</em></h2></div><p className="section-note">Small builds, side quests<br/>and useful things on the web.</p></div><div className="project-list">{portfolio.projects.map((project, index) => <a data-reveal style={{ "--i": Math.min(index, 4) } as CSSProperties} className="project-row" key={project.id} href={project.url} target={project.url.startsWith("/") ? undefined : "_blank"} rel={project.url.startsWith("/") ? undefined : "noreferrer"}><span className="project-number">0{index + 1}</span><div className="project-name"><h3>{project.title}</h3><p>{project.description}</p></div><span className="project-tag">{project.tag}</span><ArrowUpRight className="project-arrow" size={19}/></a>)}</div></section>

      <section className="contact-band" data-reveal><p>HAVE A PROJECT IN MIND?</p><a href={siteConfig.contactUrl} target="_blank" rel="noreferrer">Let’s make it move. <ArrowUpRight size={22}/></a></section>
    </main>
    <footer className="site-footer"><a className="wordmark" href="#about" aria-label="seeshaun, about section"><img src="/logo.svg" alt="" width="227" height="136"/></a><span aria-hidden="true"/><div><Link to="/links">Links</Link><span>© 2026</span></div></footer>
    {active && <div className="video-overlay" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}><button className="close-overlay" onClick={() => setActive(null)} aria-label="Close video">×</button><div className={getVideoSource(active.src).type === "tiktok" ? "video-dialog video-dialog-tall" : "video-dialog"} onClick={(event) => event.stopPropagation()}><PortfolioVideoPlayer video={active} /><div className="video-dialog-caption"><div><p>{active.category} / {active.type}</p><h2>{active.title}</h2></div><span>{active.client}</span></div></div></div>}
  </div>;
}
