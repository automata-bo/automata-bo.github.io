import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      input: [
        "index.html",
        "digital/index.html",
        "experiences/index.html",
        "experiences/demo/index.html",
        "studio/index.html",
        "studio/lab/index.html",
        "proyectos/index.html",
        "contacto/index.html",
        "demos/index.html"
      ]
    }
  }
});
