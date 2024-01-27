import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  assetsInclude: ["**/*.css"],
  build: {
    assetsDir: "./",
    outDir: "dist",
    target: "esnext",
    lib: {
      entry: "src/index.ts",
      name: "zenlite",
      fileName: "index",
      formats: ["es", "cjs"],
    },
  },
  plugins: [dts()],
});
