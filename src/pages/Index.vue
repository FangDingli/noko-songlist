<template>
  <div class="h-100vh">
    <NButton type="primary" @click="showMsg">message</NButton>
  </div>
</template>

<script lang="ts" setup>
const showMsg = () => {
  window.$message.success('111')
}
</script>
