import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Play, MoveUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { defaultPortfolio, readPortfolio, type PortfolioData, type PortfolioVideo } from "@/lib/portfolio";
import { SocialIcon } from "@/components/site/icons";
import avatar from "@/assets/avatar.jpg";
import banner from "@/assets/hero-banner.jpg";

const title = "seeshaun | Editor, motion designer, internet person";
const description = "Selected edits, motion experiments and projects by seeshaun.";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});

function Index() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(defaultPortfolio);
  const [filter, setFilter] = useState("All work");
  const [active, setActive] = useState<PortfolioVideo | null>(null);
  useEffect(() => setPortfolio(readPortfolio()), []);
  // Escape closes the video dialog, like any modal should.
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
  const videos = useMemo(() => filter === "All work" ? portfolio.videos : portfolio.videos.filter((video) => video.category === filter), [filter, portfolio.videos]);

  return <div className="site-shell">
    <header className="site-header"><a className="wordmark" href="#top" aria-label="seeshaun, back to top"><img src="/logo.svg" alt="" width="227" height="136"/></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#projects">Projects</a><a href="#about">About</a><Link to="/links">Links <ArrowUpRight size={13}/></Link></nav><a className="header-contact" href={siteConfig.contactUrl} target="_blank" rel="noreferrer">Let’s talk <MoveUpRight size={14}/></a></header>
    <main>
      <section className="intro" id="top">
        <div className="intro-copy"><p className="eyebrow"><span className="live-dot"/> INDEPENDENT CREATOR</p><h1>I make the<br/><em>internet move.</em></h1><p className="intro-description">Video edits, motion graphics and visual experiments. Built around rhythm, detail and a slightly unreasonable number of keyframes.</p><div className="intro-actions"><a className="button-lime" href="#work">View selected work <ArrowDownRight size={16}/></a><a className="text-link" href="https://tiktok.com/@seeshaun" target="_blank" rel="noreferrer">Follow along <ArrowUpRight size={14}/></a></div></div>
        <div className="intro-art"><div className="art-topline"><span>PERSONAL ARCHIVE</span><span>VISUAL NOTES ↗</span></div><div className="reel-frame"><img src={banner} alt="Abstract portfolio artwork"/><div className="reel-grain"/><div className="reel-stamp">S<span>/</span>S</div><div className="reel-caption"><span>SELECTED FRAMES</span><strong>VISUAL NOTES / 2026</strong></div></div><div className="art-bottomline"><span>EDITING / COMPOSITING / DESIGN</span><span>SELECTED WORK</span></div></div>
        <div className="intro-index">PORTFOLIO INDEX <span>↓ SCROLL TO EXPLORE</span></div>
      </section>

      <section className="work-section section-wrap" id="work"><div className="section-top"><div><p className="section-kicker">01 / THE OUTPUT</p><h2>Selected <em>work</em></h2></div><p className="section-note">A collection of edits, motion tests<br/>and things made to hit on beat.</p></div>
        <div className="work-toolbar"><div className="filter-tabs" aria-label="Filter work">{["All work", "Edits", "Motion graphics", "Other work"].map((item) => <button key={item} className={filter === item ? "filter-tab active" : "filter-tab"} onClick={() => setFilter(item)}>{item}<span>{item === "All work" ? portfolio.videos.length : portfolio.videos.filter((v) => v.category === item).length.toString().padStart(2, "0")}</span></button>)}</div><span className="work-count">{videos.length.toString().padStart(2, "0")} PIECES</span></div>
        {videos.length ? <div className="work-grid">{videos.map((video, index) => <button className={`work-item work-item-${index % 3}`} key={video.id} onClick={() => setActive(video)}><div className="work-media"><video src={video.src} poster={video.poster || banner} muted loop playsInline preload="metadata" onMouseEnter={(event) => void event.currentTarget.play().catch(() => {})} onMouseLeave={(event) => { event.currentTarget.pause(); event.currentTarget.currentTime = 0; }}/><span className="play-mark"><Play size={16} fill="currentColor"/></span><span className="media-index">{String(index + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}</span></div><div className="work-meta"><div><p className="work-type">{video.category} / {video.type}</p><h3>{video.title}</h3></div><span className="work-client">{video.client || "PERSONAL"}<ArrowUpRight size={14}/></span></div></button>)}</div> : <div className="empty-work">Nothing in this section yet. New work will show up here when it is published.</div>}
      </section>

      <section className="projects-section section-wrap" id="projects"><div className="section-top"><div><p className="section-kicker">02 / OUTSIDE THE TIMELINE</p><h2>Other <em>projects</em></h2></div><p className="section-note">Small builds, side quests<br/>and useful things on the web.</p></div><div className="project-list">{portfolio.projects.map((project, index) => <a className="project-row" key={project.id} href={project.url} target={project.url.startsWith("/") ? undefined : "_blank"} rel={project.url.startsWith("/") ? undefined : "noreferrer"}><span className="project-number">0{index + 1}</span><div className="project-name"><h3>{project.title}</h3><p>{project.description}</p></div><span className="project-tag">{project.tag}</span><ArrowUpRight className="project-arrow" size={19}/></a>)}</div></section>

      <section className="about-section section-wrap" id="about"><div className="about-portrait"><img src={avatar} alt="seeshaun profile artwork"/><span>MAKING THINGS / MOST DAYS</span></div><div className="about-copy"><p className="section-kicker">03 / A LITTLE CONTEXT</p><h2>Hey, I’m Shaun.<br/><em>I make stuff.</em></h2><p>I’m a creator focused on punchy video edits, motion design and the little details that make a piece feel alive. I like learning how things work just as much as making them look good.</p><div className="social-row">{siteConfig.socials.map((social) => <a key={social.key} href={social.url} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}><SocialIcon name={social.key} className="h-[17px] w-[17px]"/></a>)}</div></div></section>
      <section className="contact-band"><p>HAVE A PROJECT IN MIND?</p><a href={siteConfig.contactUrl} target="_blank" rel="noreferrer">Let’s make it move. <ArrowUpRight size={22}/></a></section>
    </main>
    <footer className="site-footer"><a className="wordmark" href="#top" aria-label="seeshaun, back to top"><img src="/logo.svg" alt="" width="227" height="136"/></a><span aria-hidden="true"/><div><Link to="/links">Links</Link><span>© 2026</span></div></footer>
    {active && <div className="video-overlay" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}><button className="close-overlay" onClick={() => setActive(null)} aria-label="Close video">×</button><div className="video-dialog" onClick={(event) => event.stopPropagation()}><video src={active.src} poster={active.poster || banner} controls autoPlay playsInline/><div className="video-dialog-caption"><div><p>{active.category} / {active.type}</p><h2>{active.title}</h2></div><span>{active.client}</span></div></div></div>}
  </div>;
}
