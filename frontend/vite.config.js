import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
    },

    headers: {
      "Content-Security-Policy":
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://accounts.google.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; " + // Allow styles from Google OAuth
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' data: blob: https://images.pexels.com; " +
        "connect-src 'self' http://localhost:8081; " +
        "frame-src 'self' https://accounts.google.com;",
    },
  },
});
