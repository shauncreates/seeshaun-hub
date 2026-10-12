import { useEffect, useRef } from "react";

// Small motion enhancements: scroll reveals, progress indicator and subtle button magnetism.
// No custom cursor is rendered or tracked.

const MAGNET = ".button-lime, .header-contact, .social-row a, .contact-band a";

export function MotionEffects() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const undo: Array<() => void> = [];

    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    const scan = (instant: boolean) => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (instant && el.getBoundingClientRect().top < window.innerHeight * 0.94) {
          el.classList.add("is-in");
        } else {
          io.observe(el);
        }
      });
    };
    scan(true);
    root.classList.add("motion-live");
    const mo = new MutationObserver(() => scan(false));
    mo.observe(document.body, { childList: true, subtree: true });
    undo.push(() => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("motion-live");
    });

    let ticking = false;
    const paintProgress = () => {
      ticking = false;
      const max = root.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("--p", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paintProgress);
      }
    };
    paintProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    undo.push(() => window.removeEventListener("scroll", onScroll));

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let magnet: HTMLElement | null = null;
      const release = () => {
        if (!magnet) return;
        magnet.style.removeProperty("--tx");
        magnet.style.removeProperty("--ty");
        magnet.removeAttribute("data-magnet-on");
        magnet = null;
      };
      const onMove = (event: PointerEvent) => {
        const target = event.target as Element | null;
        const hit = target?.closest<HTMLElement>(MAGNET) ?? null;
        if (hit !== magnet) release();
        if (hit) {
          magnet = hit;
          const box = hit.getBoundingClientRect();
          const strength = hit.matches(".contact-band a") ? 0.05 : 0.18;
          const dx = (event.clientX - (box.left + box.width / 2)) * strength;
          const dy = (event.clientY - (box.top + box.height / 2)) * strength;
          hit.setAttribute("data-magnet-on", "");
          hit.style.setProperty("--tx", `${Math.max(-8, Math.min(8, dx)).toFixed(1)}px`);
          hit.style.setProperty("--ty", `${Math.max(-8, Math.min(8, dy)).toFixed(1)}px`);
        }
      };
      const onLeave = () => release();
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      undo.push(() => {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        release();
      });
    }

    return () => undo.forEach((fn) => fn());
  }, []);

  return <div ref={bar} className="scroll-progress" aria-hidden="true" />;
}
