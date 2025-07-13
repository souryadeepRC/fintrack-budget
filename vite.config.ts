import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser", // Switch to Terser
    terserOptions: {
      compress: {
        drop_console: true, // ✅ Removes all console.*
        drop_debugger: true, // ✅ Removes debugger statements
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
  server: {
    port: 5000,
    open: false,
  },
});
