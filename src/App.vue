<template>
  <NConfigProvider>
    <NaiveProvider>
      <RouterView></RouterView>
    </NaiveProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import NaiveProvider from './components/NaiveProvider.vue'
</script>
