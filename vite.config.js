import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Vizard-fashion-store/",
  plugins: [react(), tailwindcss()],
});