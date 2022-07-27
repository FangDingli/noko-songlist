import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/devServer': {
        target: 'http://8.136.112.243:8000', // here is dev server host
        changeOrigin: true,
        rewrite: path => path.replace(/^\/devServer/, ''),
      },
    },
    fs: {
      strict: false,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        'vue-router',
        { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] },
      ],
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: true,
      // 不想他自动导入components，故意写错目录名称
      dirs: ['src/component'],
      // exclude: [/\.\/src\/components\//],
      resolvers: [NaiveUiResolver()], // here is third party ui library, see more detail in your library document
    }),
  ],
})
