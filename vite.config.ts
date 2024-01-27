import { defineConfig } from "vite";
import ZenLiteVitePlugin from "./src/vite-plugin-zenlite";

export default defineConfig({
  assetsInclude: ["**/*.css"],
  build: {
    assetsDir: './',
    outDir: "dist",
    target: "esnext",
    lib: {
      entry: "src/index.ts",
      name: "zenlite",
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
  // plugins: [ZenLiteVitePlugin()],
});
