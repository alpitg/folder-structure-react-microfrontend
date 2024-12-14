import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app",
      remotes: {
        microfrontWidge: "http://localhost:4174/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom"]
    })
  ],
})
