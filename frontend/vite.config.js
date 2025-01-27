import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [react()],
  server: {
    host: true,
    port: 5173,

    proxy: {
      "/auth": {
        target: "https://tunify-back.ajdsgkljadkgjg.xyz/",
        changeOrigin: true,
        secure: false,
      },
      '/account': {
        target: 'https://tunify-back.ajdsgkljadkgjg.xyz/', // Your backend server
        changeOrigin: true, // Ensures the origin of the host header matches the target URL
      },
    },

    headers: {
      "Content-Security-Policy":
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://accounts.google.com https://connect.facebook.net; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; " + 
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' data: blob: https://images.pexels.com; " +
        "connect-src 'self' https://tunify-back.ajdsgkljadkgjg.xyz/ https://www.facebook.com https://graph.facebook.com; " +
        "frame-src 'self' https://accounts.google.com;",
      
      "Cross-Origin-Opener-Policy": "unsafe-none",
    },
  },
});
