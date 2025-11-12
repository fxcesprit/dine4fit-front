import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: "/dine4fit-front",
  server: { 
    port: 3000,
    proxy: {
      "/api/v1": {
        target: "http://localhost:8000",
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
    https:{
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
  },
  plugins: [
    react(), 
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: true,
    //   },
    //   manifest: {
    //     "name": "dine4fit-front",
    //     "short_name": "dine4fit",
    //     "start_url": "/dine4fit-front/",
    //     "display": "standalone",
    //     "background_color": "#fdfdfd",
    //     "theme_color": "#db4938",
    //     "orientation": "portrait-primary",
    //     "icons": [
    //       {
    //         "src": "/dine4fit-front/logo-192.png",
    //         "type": "image/png", 
    //         "sizes": "192x192"
    //       },
    //                 {
    //         "src": "/dine4fit-front/logo-512.png",
    //         "type": "image/png", 
    //         "sizes": "512x512"
    //       }
    //     ]
    //   } 
    // }),
    mkcert()
  ],
})
