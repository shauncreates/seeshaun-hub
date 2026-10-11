import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

// Plain Vite config. Plugin order matters: tanstackStart must come before viteReact.
// Deploy target is Vercel by default. To build for another host, set the NITRO_PRESET
// environment variable instead of editing code, for example NITRO_PRESET=cloudflare-module.
export default defineConfig(({ command }) => ({
  server: { host: "::", port: 8080 },
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Use src/server.ts (the SSR error wrapper) as the server entry.
      server: { entry: "server" },
    }),
    // Nitro only runs for production builds.
    ...(command === "build" ? [nitro({ preset: process.env["NITRO_PRESET"] || "vercel" })] : []),
    viteReact(),
  ],
}));
