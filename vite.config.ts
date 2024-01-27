import { defineConfig } from "vite";
import ZenLiteVitePlugin from "./src/vite-plugin-zenlite";

export default defineConfig({
  assetsInclude: ["**/*.zlt"],
  build: {
    assetsDir: './',
    outDir: "dist",
    target: "esnext",
    lib: {
      entry: "src/main.ts",
      name: "zenlite",
      fileName: "zenlite",
      formats: ["es", "cjs"],
    },
  },
  // plugins: [ZenLiteVitePlugin()],
});
