<template>
  <NConfigProvider :themeOverrides="themeOverrides">
    <NaiveProvider>
      <RouterView></RouterView>
    </NaiveProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import NaiveProvider from './components/NaiveProvider.vue'
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#945766',
    // primaryColorPressed: '#CA8B9B',
    primaryColorHover: '#CA8B9B',
  },
}
</script>
