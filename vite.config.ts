import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Project Pages are served from /<repo>/, so assets must resolve there.
  base: '/mackintosh-spatial/',
  plugins: [react(), tailwindcss()],
})
