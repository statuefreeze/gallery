import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import UnoCSS from "unocss/vite";

// Adjust base when deploying to GitHub Pages, e.g. "/asfr-gallery/"
export default defineConfig({
  plugins: [UnoCSS(), react()],
  base: process.env.VITE_BASE_PATH || "/",
});
