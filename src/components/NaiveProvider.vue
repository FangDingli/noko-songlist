<template>
  <NDialogProvider>
    <NNotificationProvider>
      <NMessageProvider>
        <slot></slot>
        <NaiveProviderContent></NaiveProviderContent>
      </NMessageProvider>
    </NNotificationProvider>
  </NDialogProvider>
</template>

<script lang="ts" setup>
import { setupMessage } from '~/utils'
function registerNaiveTools() {
  // @ts-ignore
  window.$message = setupMessage(useMessage())
}

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools()
  },
  render() {
    return h('div')
  },
})
</script>
