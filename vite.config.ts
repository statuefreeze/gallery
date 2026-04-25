import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import UnoCSS from "unocss/vite";

// Adjust base when deploying to GitHub Pages, e.g. "/asfr-gallery/"
export default defineConfig({
  plugins: [UnoCSS(), react()],
  base: process.env.VITE_BASE_PATH || "/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        "404": path.resolve(__dirname, "404.html"),
      },
    },
  },
});
