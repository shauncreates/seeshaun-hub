import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Plus, Trash2, LogIn, LogOut } from "lucide-react";
import {
  signInToStudio,
  signOutOfStudio,
  getStudioAdminStatus,
  fetchStudioPortfolio,
  fetchAbout,
  saveStudioAbout,
  createStudioVideo,
  createStudioProject,
  deleteStudioVideo,
  deleteStudioProject,
  type NewPortfolioVideo,
  type NewPortfolioProject,
} from "@/lib/studio-backend";
import { defaultAbout, type AboutContent, type PortfolioData } from "@/lib/portfolio";

export const Route = createFileRoute("/studio")({
  component: Studio,
});

function Studio() {
  const [data, setData] = useState<PortfolioData>({
    videos: [],
    projects: [],
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [kind, setKind] = useState<"video" | "project" | "about">("video");
  const [aboutForm, setAboutForm] = useState<AboutContent>(defaultAbout);
  const [form, setForm] = useState({
    title: "",
    src: "",
    poster: "",
    client: "",
    type: "",
    category: "Edits",
    description: "",
    url: "",
    tag: "Project",
  });

  async function loadPortfolio() {
    const portfolio = await fetchStudioPortfolio();
    setData(portfolio);
  }

  useEffect(() => {
    let active = true;

    async function initialise() {
      try {
        const status = await getStudioAdminStatus();

        if (status.isAdmin && active) {
          const portfolio = await fetchStudioPortfolio();
          const about = await fetchAbout().catch(() => defaultAbout);
          if (active) {
            setData(portfolio);
            setAboutForm(about);
            setLoggedIn(true);
          }
        }
      } catch (error) {
        if (active) {
          setNotice(error instanceof Error ? error.message : "Could not connect to Supabase.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void initialise();
    return () => {
      active = false;
    };
  }, []);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNotice("");

    try {
      await signInToStudio(email, password);
      await loadPortfolio();
      setAboutForm(await fetchAbout().catch(() => defaultAbout));
      setLoggedIn(true);
      setPassword("");
      setNotice("Signed in. Your portfolio is connected to Supabase.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  async function submitAbout(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    try {
      await saveStudioAbout(aboutForm);
      setNotice("About me saved. It is live on the site now.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not save About me.");
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    try {
      await signOutOfStudio();
      setLoggedIn(false);
      setData({ videos: [], projects: [] });
      setNotice("Signed out.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Sign-out failed.");
    } finally {
      setBusy(false);
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNotice("");

    try {
      if (kind === "video") {
        if (!form.title.trim() || !form.src.trim()) {
          setNotice("Add a title and video URL first.");
          return;
        }

        const video: NewPortfolioVideo = {
          title: form.title.trim(),
          src: form.src.trim(),
          poster: form.poster.trim(),
          client: form.client.trim() || "PERSONAL",
          type: form.type.trim() || "Video",
          category: form.category as NewPortfolioVideo["category"],
        };

        await createStudioVideo(video);
      } else {
        if (!form.title.trim() || !form.url.trim()) {
          setNotice("Add a title and project URL first.");
          return;
        }

        const project: NewPortfolioProject = {
          title: form.title.trim(),
          description: form.description.trim(),
          url: form.url.trim(),
          tag: form.tag.trim() || "Project",
        };

        await createStudioProject(project);
      }

      await loadPortfolio();
      setForm({
        title: "",
        src: "",
        poster: "",
        client: "",
        type: "",
        category: "Edits",
        description: "",
        url: "",
        tag: "Project",
      });
      setNotice("Saved to Supabase successfully.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not save your item.");
    } finally {
      setBusy(false);
    }
  }

  async function removeVideo(id: string) {
    if (!window.confirm("Delete this video from the database?")) return;
    setBusy(true);
    setNotice("");

    try {
      await deleteStudioVideo(id);
      await loadPortfolio();
      setNotice("Video deleted.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not delete video.");
    } finally {
      setBusy(false);
    }
  }

  async function removeProject(id: string) {
    if (!window.confirm("Delete this project from the database?")) return;
    setBusy(true);
    setNotice("");

    try {
      await deleteStudioProject(id);
      await loadPortfolio();
      setNotice("Project deleted.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not delete project.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <main className="studio-shell">
        <p className="studio-lede">Connecting to Studio…</p>
      </main>
    );
  }

  return (
    <div className="studio-shell">
      <header className="studio-header">
        <Link to="/" className="studio-back">
          <ArrowLeft size={16} /> Back to website
        </Link>
        <span className="studio-mark">SEESHAUN / STUDIO</span>
      </header>

      <main className="studio-main">
        <p className="section-kicker">CONTENT WORKSPACE / SUPABASE</p>
        <h1>
          Manage your <em>work.</em>
        </h1>
        <p className="studio-lede">Your changes are saved to the connected portfolio database.</p>

        {!loggedIn ? (
          <section className="studio-form-panel">
            <h2>Studio sign in</h2>
            <form onSubmit={handleLogin}>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="username"
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </label>
              <button className="studio-submit" disabled={busy} type="submit">
                <LogIn size={16} /> {busy ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </section>
        ) : (
          <>
            <div className="studio-columns">
              <section className="studio-form-panel">
                <div className="studio-switch">
                  <button
                    type="button"
                    className={kind === "video" ? "selected" : ""}
                    onClick={() => setKind("video")}
                  >
                    Video / edit
                  </button>
                  <button
                    type="button"
                    className={kind === "project" ? "selected" : ""}
                    onClick={() => setKind("project")}
                  >
                    Project
                  </button>
                  <button
                    type="button"
                    className={kind === "about" ? "selected" : ""}
                    onClick={() => setKind("about")}
                  >
                    About me
                  </button>
                </div>

                {kind === "about" ? (
                  <form onSubmit={submitAbout}>
                    <label>
                      Heading, first line
                      <input
                        value={aboutForm.heading}
                        maxLength={80}
                        onChange={(event) =>
                          setAboutForm({ ...aboutForm, heading: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      Heading, second line (shown in lime)
                      <input
                        value={aboutForm.accent}
                        maxLength={80}
                        onChange={(event) =>
                          setAboutForm({ ...aboutForm, accent: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      About text (leave a blank line between paragraphs)
                      <textarea
                        value={aboutForm.body}
                        rows={9}
                        maxLength={2000}
                        onChange={(event) =>
                          setAboutForm({ ...aboutForm, body: event.target.value })
                        }
                      />
                    </label>
                    <button className="studio-submit" disabled={busy} type="submit">
                      {busy ? "Saving…" : "Save About me"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={submit}>
                    <label>
                      Title
                      <input
                        value={form.title}
                        onChange={(event) => setForm({ ...form, title: event.target.value })}
                        required
                      />
                    </label>

                    {kind === "video" ? (
                      <>
                        <label>
                          Video URL
                          <input
                            type="url"
                            value={form.src}
                            onChange={(event) => setForm({ ...form, src: event.target.value })}
                            required
                          />
                        </label>
                        <label>
                          Thumbnail URL (optional)
                          <input
                            type="url"
                            value={form.poster}
                            onChange={(event) => setForm({ ...form, poster: event.target.value })}
                          />
                        </label>
                        <div className="studio-field-row">
                          <label>
                            Category
                            <select
                              value={form.category}
                              onChange={(event) =>
                                setForm({ ...form, category: event.target.value })
                              }
                            >
                              <option>Edits</option>
                              <option>Motion graphics</option>
                              <option>Other work</option>
                            </select>
                          </label>
                          <label>
                            Format
                            <input
                              value={form.type}
                              onChange={(event) => setForm({ ...form, type: event.target.value })}
                              placeholder="AMV / 3D / VFX"
                            />
                          </label>
                        </div>
                        <label>
                          Client or credit
                          <input
                            value={form.client}
                            onChange={(event) => setForm({ ...form, client: event.target.value })}
                            placeholder="Personal work or @handle"
                          />
                        </label>
                      </>
                    ) : (
                      <>
                        <label>
                          Project URL
                          <input
                            type="url"
                            value={form.url}
                            onChange={(event) => setForm({ ...form, url: event.target.value })}
                            required
                          />
                        </label>
                        <label>
                          Description
                          <textarea
                            value={form.description}
                            onChange={(event) =>
                              setForm({ ...form, description: event.target.value })
                            }
                            rows={3}
                          />
                        </label>
                        <label>
                          Tag
                          <input
                            value={form.tag}
                            onChange={(event) => setForm({ ...form, tag: event.target.value })}
                          />
                        </label>
                      </>
                    )}

                    <button className="studio-submit" disabled={busy} type="submit">
                      <Plus size={16} /> Add {kind === "video" ? "video" : "project"}
                    </button>
                  </form>
                )}
              </section>

              <section className="studio-items-panel">
                <div className="studio-list-heading">
                  <div>
                    <p className="section-kicker">DATABASE ITEMS</p>
                    <h2>
                      Videos <span>{data.videos.length.toString().padStart(2, "0")}</span>
                    </h2>
                  </div>
                </div>
                <div className="studio-item-list">
                  {data.videos.map((item) => (
                    <div className="studio-item" key={item.id}>
                      <div>
                        <strong>{item.title}</strong>
                        <span>
                          {item.category} · {item.type}
                        </span>
                      </div>
                      <button
                        disabled={busy}
                        onClick={() => void removeVideo(item.id)}
                        aria-label={`Delete ${item.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="studio-list-heading project-list-heading">
                  <div>
                    <p className="section-kicker">WEB / SIDE PROJECTS</p>
                    <h2>
                      Projects <span>{data.projects.length.toString().padStart(2, "0")}</span>
                    </h2>
                  </div>
                </div>
                <div className="studio-item-list">
                  {data.projects.map((item) => (
                    <div className="studio-item" key={item.id}>
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.tag}</span>
                      </div>
                      <button
                        disabled={busy}
                        onClick={() => void removeProject(item.id)}
                        aria-label={`Delete ${item.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <button
              className="studio-submit"
              type="button"
              disabled={busy}
              onClick={() => void handleLogout()}
            >
              <LogOut size={16} /> Sign out
            </button>
          </>
        )}

        {notice && (
          <p className="studio-notice" role="status">
            {notice}
          </p>
        )}
      </main>
    </div>
  );
}
