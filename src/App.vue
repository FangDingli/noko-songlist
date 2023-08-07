<template>
  <NConfigProvider :theme="currentTheme">
    <NaiveProvider>
      <RouterView></RouterView>
    </NaiveProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import NaiveProvider from './components/NaiveProvider.vue'
import { darkTheme, useOsTheme } from 'naive-ui'
import { currentTheme } from '~/utils'

const osThemeRef = useOsTheme()
currentTheme.value = osThemeRef.value === 'light' ? null : darkTheme
</script>
