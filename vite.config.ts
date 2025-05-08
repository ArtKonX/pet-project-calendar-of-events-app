import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import tailwindcss from '@tailwindcss/vite'

const __filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filePath);

export default defineConfig({
  resolve: {
    alias: {
      "@data": path.resolve(__dirname, "./src/data"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@src": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@ui": path.resolve(__dirname, "./src/components/ui-components"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    }
  },
  base: '/pet-project-calendar-of-events-app',
  plugins: [
    react(),
    tailwindcss(),
  ],
})