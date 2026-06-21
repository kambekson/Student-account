import path from "node:path";
import { createRequire } from "node:module";

import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import ViteYaml from "@modyfi/vite-plugin-yaml";
import { fileURLToPath } from "url";
import { env } from "process";
import { VitePWA } from "vite-plugin-pwa";

const require = createRequire(import.meta.url);

const pdfjsDistPath = path.dirname(require.resolve("pdfjs-dist/package.json"));
const cMapsDir = normalizePath(path.join(pdfjsDistPath, "cmaps"));

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      injectRegister: "auto",
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: false,
      },
      manifest: {
        name: "EduSpace LMS",
        short_name: "EduSpace",
        description: "Личный кабинет учащегося образовательного центра",
        start_url: "/",
        display: "standalone",
        background_color: "#fafafa",
        theme_color: "#fdcb04",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    svgr({
      svgrOptions: {},
    }),
    viteStaticCopy({
      targets: [
        {
          src: cMapsDir,
          dest: "",
        },
      ],
    }),
    ViteYaml(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
