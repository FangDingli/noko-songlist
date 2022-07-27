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
const registerNaiveTools = () => {
  window.$message = useMessage()
  window.$dialog = useDialog()
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
