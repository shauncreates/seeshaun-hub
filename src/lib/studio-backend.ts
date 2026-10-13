import {
  defaultAbout,
  type AboutContent,
  type PortfolioData,
  type PortfolioProject,
  type PortfolioVideo,
} from "@/lib/portfolio";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export type NewPortfolioVideo = Omit<PortfolioVideo, "id"> & { id?: string };
export type NewPortfolioProject = Omit<PortfolioProject, "id"> & { id?: string };

export class StudioBackendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StudioBackendError";
  }
}

function requireClient() {
  const client = getSupabaseBrowserClient();
  if (!client)
    throw new StudioBackendError(
      "Supabase is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
    );
  return client;
}

export async function signInToStudio(email: string, password: string) {
  const client = requireClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new StudioBackendError(error.message);

  const { data: admin, error: adminError } = await client
    .from("studio_admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (adminError || !admin) {
    await client.auth.signOut();
    throw new StudioBackendError("This account is not allowed to access Studio.");
  }

  return data.user;
}

export async function signOutOfStudio() {
  const { error } = await requireClient().auth.signOut();
  if (error) throw new StudioBackendError(error.message);
}

export async function getStudioAdminStatus() {
  const client = requireClient();
  const { data: sessionData, error: sessionError } = await client.auth.getSession();
  if (sessionError) throw new StudioBackendError(sessionError.message);
  const user = sessionData.session?.user;
  if (!user) return { user: null, isAdmin: false };

  const { data, error } = await client
    .from("studio_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw new StudioBackendError(error.message);
  return { user, isAdmin: Boolean(data) };
}

export async function fetchPublicPortfolio(): Promise<PortfolioData> {
  const client = requireClient();
  const [videosResult, projectsResult] = await Promise.all([
    client
      .from("portfolio_videos")
      .select("id,title,client,type,src,poster,category")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
    client
      .from("portfolio_projects")
      .select("id,title,description,url,tag")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
  ]);

  if (videosResult.error) throw new StudioBackendError(videosResult.error.message);
  if (projectsResult.error) throw new StudioBackendError(projectsResult.error.message);

  return {
    videos: (videosResult.data ?? []) as PortfolioVideo[],
    projects: (projectsResult.data ?? []) as PortfolioProject[],
  };
}

export async function fetchStudioPortfolio(): Promise<PortfolioData> {
  const client = requireClient();
  const [videosResult, projectsResult] = await Promise.all([
    client
      .from("portfolio_videos")
      .select("id,title,client,type,src,poster,category,published,sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
    client
      .from("portfolio_projects")
      .select("id,title,description,url,tag,published,sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
  ]);

  if (videosResult.error) throw new StudioBackendError(videosResult.error.message);
  if (projectsResult.error) throw new StudioBackendError(projectsResult.error.message);

  return {
    videos: (videosResult.data ?? []) as PortfolioVideo[],
    projects: (projectsResult.data ?? []) as PortfolioProject[],
  };
}

export async function createStudioVideo(video: NewPortfolioVideo) {
  const client = requireClient();
  const { error } = await client.from("portfolio_videos").insert({
    ...video,
    published: true,
    sort_order: 0,
  });
  if (error) throw new StudioBackendError(error.message);
}

export async function createStudioProject(project: NewPortfolioProject) {
  const client = requireClient();
  const { error } = await client.from("portfolio_projects").insert({
    ...project,
    published: true,
    sort_order: 0,
  });
  if (error) throw new StudioBackendError(error.message);
}

export async function deleteStudioVideo(id: string) {
  const { error } = await requireClient().from("portfolio_videos").delete().eq("id", id);
  if (error) throw new StudioBackendError(error.message);
}

export async function deleteStudioProject(id: string) {
  const { error } = await requireClient().from("portfolio_projects").delete().eq("id", id);
  if (error) throw new StudioBackendError(error.message);
}

/** Public: the About text for the homepage. Falls back to the built-in text if nothing is saved. */
export async function fetchAbout(): Promise<AboutContent> {
  const client = requireClient();
  const { data, error } = await client
    .from("site_about")
    .select("heading,accent,body")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw new StudioBackendError(error.message);
  if (!data || !(data.heading || data.accent || data.body)) return defaultAbout;
  return { heading: data.heading, accent: data.accent, body: data.body };
}

/** Studio only: saves the About text. The database rejects this for anyone who is not an admin. */
export async function saveStudioAbout(about: AboutContent) {
  const { error } = await requireClient().from("site_about").upsert({
    id: 1,
    heading: about.heading.trim(),
    accent: about.accent.trim(),
    body: about.body.trim(),
    updated_at: new Date().toISOString(),
  });
  if (error) throw new StudioBackendError(error.message);
}
