# noko songlist
> 为 [noko](https://space.bilibili.com/393885664) 创建的歌单（应该不止歌单）

## 特性
- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite 3](https://github.com/vitejs/vite), [pnpm](https://github.com/pnpm/pnpm), [ESBuild](https://github.com/evanw/esbuild) - 快！
- 🗂 [基于文件的路由](./src/pages)
- 📦 [组件自动化加载](./src/components)
- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎
- 😃 [各种图标集为你所用](https://github.com/antfu/unocss/tree/main/packages/preset-icons)
- 🔥 使用 [新的 `<script setup>` 语法](https://github.com/vuejs/rfcs/pull/227)
- 🦾 TypeScript, 当然


## 配置

### UI层

- [UnoCSS](https://github.com/antfu/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎
- [NaiveUI](https://github.com/TuSimple/naive-ui) - 一个 Vue3 的组件库，比较完整，主题可调，用 TypeScript 写的，快。
- [UnoCSS 的纯 CSS 图标方案](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### 插件

- [Vue Router](https://github.com/vuejs/vue-router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - 以文件系统为基础的路由
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 等，无需导入
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - 自动加载组件
- [VueUse](https://github.com/antfu/vueuse) - 实用的 Composition API 工具合集
  - [useFetch](./src/composables/request.ts) - 基于useFetch封装的请求方法（天天用axios用累了），感谢 [element-admin-template](https://github.com/tolking/element-admin-template)

## 初始模板基于 [vitesse-lite](https://github.com/antfu/vitesse-lite)