import { defineConfig } from "vite";


export default defineConfig({
  base: "/pixel_poker/",

  build: {
    outDir: "docs",
    sourcemap: true,
  },
});