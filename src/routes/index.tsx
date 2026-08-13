import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { Projects } from "@/components/site/Projects";
import { Edits } from "@/components/site/Edits";
import { Playlists } from "@/components/site/Playlists";
import { Stats } from "@/components/site/Stats";
import { Footer } from "@/components/site/Footer";

const title = "shaun — Video Editor & Motion Graphics Creator";
const description =
  "Portfolio of shaun (@seeshaun): transition edits, motion graphics and After Effects work, plus presets, links and community.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <Projects />
        <Edits />
        <Playlists />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
