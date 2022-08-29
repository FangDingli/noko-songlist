<template>
  <NConfigProvider :themeOverrides="themeOverrides">
    <slot></slot>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#945766',
    primaryColorPressed: '#601C2D',
    primaryColorHover: '#CA8B9B',
  },
}
</script>
