import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/Vizard-fashion-store/",

  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: "pages-entry.js",
      output: {
        entryFileNames: "assets/site.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) =>
          assetInfo.name && assetInfo.name.endsWith(".css")
            ? "assets/site.css"
            : "assets/[name][extname]",
      },
    },
  },

  plugins: [react(), tailwindcss()],
});
