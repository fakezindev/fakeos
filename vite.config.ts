import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // O __dirname garante que o Vite junta o diretório atual ("client") com a pasta "src"
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@shared": fileURLToPath(new URL("../shared", import.meta.url))
    },
  },
});