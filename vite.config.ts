import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    react({ jsxRuntime: "classic" }),
    tsConfigPaths(),
    dts({ include: "src/" }),
  ],
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "Kontrol",
      formats: ["es", "umd"],
      fileName: (format) => `kontrol.${format}.js`,
    },
    // make React and Framer Motion external to avoid bundling them
    // https://vitejs.dev/guide/build.html#library-mode
    rollupOptions: {
      external: ["react", "react-dom", "framer-motion"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "framer-motion": "FramerMotion",
        },
      },
    },
  },
});
