### Features

- [ ]  UI component
    - [x]  Folder structure
    - [ ]  Login
    - [ ]  Side bar
    - [ ]  header
- [x]  Microfrotend support
- [ ]  Axios
- [ ]  Redux - `npm install @reduxjs/toolkit react-redux`
- [ ]  Slice
- [ ]  Thunk
- [ ]  Custom Theme selection 
- [ ]  -----

### usefull commands
```shell
npm create vite@latest host-app --template react-ts
cd host-app                                       
npm install                                                
npm run dev      
npm install @originjs/vite-plugin-federation --save-dev                                          

npm create vite@latest micro-widget --template react-ts
cd micro-widget                                       
npm install                                                
npm run dev                                                
npm install @originjs/vite-plugin-federation --save-dev

npm run build
npm run preview
```

### micro frontend setting
```ts
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "micro-widget", // Does not matter for import as microfrontend
      filename: "remoteEntry.js",
      exposes: {
        "./Widget": "./src/App",
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
```

### host/parent app setting
```ts
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
        // Module name is used to import app in modules
        microWidget: "http://localhost:4173/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom"]
    })
  ],
})
```