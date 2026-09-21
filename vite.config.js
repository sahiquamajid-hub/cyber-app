import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // or standard plugin configuration

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
