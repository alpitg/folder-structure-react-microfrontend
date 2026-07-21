### Features

- [ ]  UI component
    - [x]  Folder structure
    - [ ]  Login
    - [ ]  Side bar
    - [ ]  header
- [x]  Microfrotend support
- [x]  Axios
- [x]  Redux - `npm install @reduxjs/toolkit react-redux --save`
- [x]  Slice
- [ ]  Thunk
- [ ]  Custom Theme selection 
- [ ]  -----


### For fresh start
#### usefull commands
```shell
# [1]
npm create vite@latest host-app --template react-ts
cd host-app                                       
npm install                                                
npm run dev      
npm install @originjs/vite-plugin-federation --save-dev                                          

# [2]
npm create vite@latest micro-widget --template react-ts
cd micro-widget                                       
npm install                                                
npm run dev                                                
npm install @originjs/vite-plugin-federation --save-dev

npm run build
npm run preview

# [3]
npm create vite@latest micro-ss-construction --template react-ts
cd micro-ss-construction                                       
npm install                                                
npm run dev                                                
npm install @originjs/vite-plugin-federation --save-dev

npm run build
npm run preview

# [4]
npm create vite@latest micro-posterica --template react-ts
cd micro-posterica                                       
npm install                                                
npm run dev                                                
npm install @originjs/vite-plugin-federation --save-dev

npm run build
npm run preview


```

##### micro frontend setting
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

##### host/parent app setting
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


### Docker commands

```cmd
docker compose up --build


docker build -t micro-furniture .
docker run -p 3001:80 micro-furniture

```

### VM connect

```cmd
chmod 400 /Users/alpitg/Downloads/sites-vm_key.pem

ssh -i /Users/alpitg/Downloads/sites-vm_key.pem azureuser@135.235.196.64


```


### SSL certificate 
```cmd

sudo apt install certbot python3-certbot-nginx -y

sudo certbot --nginx \
-d artisanstudio.centralindia.cloudapp.azure.com


sudo certbot renew --dry-run

```

### Nginx conf

1. Find your active Nginx site file
Run:

```cmd
sudo nginx -T | grep -B2 -A5 "listen 80"
```
or list enabled sites:

```cmd
ls -l /etc/nginx/sites-enabled/
```

2. Edit your Nginx site configuration
For example:

```cmd
sudo nano /etc/nginx/sites-enabled/default
```

(or whichever file you found)

Make sure your HTTP server block looks like this:

```cmd
server {
    listen 80;
    listen [::]:80;

    server_name artisanstudio.centralindia.cloudapp.azure.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Save the file.

3. Test and reload Nginx

```cmd
sudo nginx -t
```

If successful:

```cmd
sudo systemctl reload nginx
```

4. Install the already-created certificate
Now run:

```cmd
sudo certbot install --cert-name artisanstudio.centralindia.cloudapp.azure.com
```
Certbot should now find the matching server block and add:

```cmd
listen 443 ssl;
ssl_certificate /etc/letsencrypt/live/artisanstudio.centralindia.cloudapp.azure.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/artisanstudio.centralindia.cloudapp.azure.com/privkey.pem;
```

5. Verify HTTPS

```cmd
sudo ss -tulpn | grep :443
```

Then:
```cmd
curl -Ik https://artisanstudio.centralindia.cloudapp.azure.com
```

If you paste the output of:

```cmd
sudo nginx -T | grep -E "server_name|listen"
```

I can tell you exactly which Nginx file needs editing.


