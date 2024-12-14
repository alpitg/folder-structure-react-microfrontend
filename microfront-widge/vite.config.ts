import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
    name: "micro-widge", // Does not matter for import as microfrontend
    filename: "remoteEntry.js",
    exposes: {
      "./Widge": "./src/App",
    },
    shared: ["react", "react-dom"],
  })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})