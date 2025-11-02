import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //"Blog-app/react-blog-frontend"
  base: process.env.VITE_BASE_PATH || "Blog-app/react-blog-frontend"
})
