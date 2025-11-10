import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import electron from 'vite-plugin-electron/simple'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

import { moveHtmlPlugin } from './src/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const enabledElectron = env.VITE_VUE_ENABLED_ELECTRON === '1'
  const blockName = env.VITE_VUE_PLUGIN_BLOCK || 'renderer'
  const plugins = enabledElectron
    ? [
        electron({
          main: {
            // Shortcut of `build.lib.entry`.
            entry: path.join(__dirname, 'src/electron/main.ts')
          },
          preload: {
            // Shortcut of `build.rollupOptions.input`.
            // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
            input: path.join(__dirname, 'src/electron/preload.ts')
          },
          // Ployfill the Electron and Node.js API for Renderer process.
          // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
          // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
          renderer:
            process.env.NODE_ENV === 'test'
              ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
                undefined
              : {}
        })
      ]
    : []

  return {
    base: '/',
    build: {
      publicDir: 'public',
      outDir: 'dist'
    },
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: 'localhost',
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_APP_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'vue-i18n': ['useI18n']
          }
        ],
        dts: './src/auto-imports.d.ts'
      }),
      createHtmlPlugin({
        minify: true,
        entry: `/src/${blockName}/main.ts`,
        template: `/src/${blockName}/index.html`
      }),
      moveHtmlPlugin(),
      ...plugins
    ]
  }
})
