import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // The site is published as a GitHub Pages user site (Tech-Achintya.github.io)
  // and served from the custom domain https://achinty.me, so it lives at the
  // domain root. Do not change this to /Tech-Achintya.github.io/.
  base: '/',
  plugins: [react()],
})
