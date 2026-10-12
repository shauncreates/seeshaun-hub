import { siteConfig } from "@/config/site";

export type PortfolioVideo = {
  id: string;
  title: string;
  client: string;
  type: string;
  src: string;
  poster: string;
  category: "Edits" | "Motion graphics" | "Other work";
};

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  url: string;
  tag: string;
};

export type PortfolioData = { videos: PortfolioVideo[]; projects: PortfolioProject[] };

const id = (prefix: string, index: number) => `${prefix}-${index + 1}`;
export const defaultPortfolio: PortfolioData = {
  videos: [],
  projects: siteConfig.projects
    .filter((project) => !project.url.includes("example.com"))
    .map((project, index) => ({ ...project, id: id("project", index) })),
};

export type AboutContent = {
  /** First line of the heading, plain. */
  heading: string;
  /** Second line of the heading, shown in lime. */
  accent: string;
  /** Body text. A blank line starts a new paragraph. */
  body: string;
};

export const defaultAbout: AboutContent = {
  heading: "Hey, I’m Shaun.",
  accent: "I make stuff.",
  body: "I’m a creator focused on punchy video edits, motion design and the little details that make a piece feel alive. I like learning how things work just as much as making them look good.",
};
