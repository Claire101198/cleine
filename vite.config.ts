import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Change this to the repository name for GitHub Pages project sites, or
// set it to '/' for a user/organization page or a custom domain.
export default defineConfig({
  plugins: [react()],
  base: '/cleine/',
})
