import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import vueDevTools from 'vite-plugin-vue-devtools'
import Unfonts from 'unplugin-fonts/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/assets/scss/settings.scss',
      },
    }),
    Unfonts({
      google: {
        families: [
          {
            name: 'Inter',
            styles: 'wght@100;300;400;500;600;700;900',
          },
        ],
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // creating a separate chunk for vuetify
          if (id.includes('vuetify')) {
            return 'vuetify';
          }

          if (id.includes('leaflet')) {
            return 'leaflet';
          }
        },
      },
    },
  }
})
