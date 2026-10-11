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
export const PORTFOLIO_KEY = "seeshaun-portfolio-v1";

const id = (prefix: string, index: number) => `${prefix}-${index + 1}`;
export const defaultPortfolio: PortfolioData = {
  videos: [],
  projects: siteConfig.projects
    .filter((project) => !project.url.includes("example.com"))
    .map((project, index) => ({ ...project, id: id("project", index) })),
};

export function readPortfolio(): PortfolioData {
  if (typeof window === "undefined") return defaultPortfolio;
  try {
    const saved = window.localStorage.getItem(PORTFOLIO_KEY);
    if (!saved) return defaultPortfolio;
    const parsed = JSON.parse(saved) as PortfolioData;
    if (!Array.isArray(parsed.videos) || !Array.isArray(parsed.projects)) return defaultPortfolio;
    return parsed;
  } catch {
    return defaultPortfolio;
  }
}

export function writePortfolio(data: PortfolioData) {
  window.localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(data));
}
