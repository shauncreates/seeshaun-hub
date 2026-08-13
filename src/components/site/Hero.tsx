import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "./icons";
import avatar from "@/assets/avatar.jpg";
import banner from "@/assets/hero-banner.jpg";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-5 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div className="panel rounded-3xl p-7">
          <div className="flex items-center gap-4">
            <img
              src={avatar}
              alt="shaun logo"
              width={768}
              height={768}
              className="h-20 w-20 rounded-2xl border border-primary/50 object-cover shadow-glow"
            />
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-glow">
                {siteConfig.name}
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{siteConfig.handle}</p>
            </div>
          </div>

          <p className="mt-5 font-display text-sm font-medium text-foreground/90">
            {siteConfig.tagline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{siteConfig.bio}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {siteConfig.socials.map((s) => (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:shadow-glow"
              >
                <SocialIcon name={s.key} className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="panel group relative overflow-hidden rounded-3xl">
          <video
            ref={videoRef}
            src={siteConfig.featuredVideo.src}
            poster={siteConfig.featuredVideo.poster || banner}
            loop
            muted={muted}
            playsInline
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
            <div>
              <p className="font-display text-lg font-semibold">{siteConfig.featuredVideo.title}</p>
              <p className="text-xs text-muted-foreground">{siteConfig.featuredVideo.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause featured video" : "Play featured video"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 bg-primary/15 text-primary transition-colors hover:bg-primary/25"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary/70 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
