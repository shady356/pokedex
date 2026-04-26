import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const mainScssPath = path.resolve(__dirname, 'src/styles/main.scss').replace(/\\/g, '/')

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/pokedex/' : '/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'PokéView',
        short_name: 'PokéView',
        theme_color: '#93EDE4',
        background_color: '#FFFFFF',
        icons: [
          {
            src: 'img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.jsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "${mainScssPath}" as *;\n`
      }
    }
  },
  server: {
    proxy: {
      '/api/v2': {
        target: 'https://pokeapi.co',
        changeOrigin: true
      }
    }
  }
}))
