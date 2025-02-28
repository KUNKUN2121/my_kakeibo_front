import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unfonts from 'unplugin-fonts/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unfonts({
        google: {
          families: [
            'Noto Sans JP'
          ],
        }
      }),
],
})
