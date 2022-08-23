<template>
  <div grid="~ cols-1" class="font-loli" font="" text="white 20px lt-sm:16px">
    <div grid="~ cols-[2fr_1fr_1fr_1fr] lt-sm:cols-[2fr_1fr] gap-2" class="h-50px bg-blue bg-op-50">
      <div class="pl-5% self-center">歌曲名称</div>
      <div class="self-center">歌手</div>
      <div class="self-center" lt-sm="invisible h-0">语言</div>
      <div class="self-center" lt-sm="invisible h-0">风格</div>
    </div>
    <div
      v-for="item in props.songs"
      :key="item.id"
      grid="~ cols-[2fr_1fr_1fr_1fr] lt-sm:cols-[2fr_1fr] gap-2"
      m="y-2"
      p="y-3"
      hover="bg-white bg-op-40"
      transition="~ duration-200 ease-in-out"
      border="0 rounded-2"
    >
      <div class="truncate pl-5%">{{ item.title }}</div>
      <div class="truncate">{{ item.artist }}</div>
      <div class="truncate" lt-sm="invisible">{{ item.language }}</div>
      <div class="truncate" lt-sm="invisible">{{ item.type }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ISongInfo } from '~/types/songlist'

const props = withDefaults(defineProps<{ songs: ISongInfo[] | null }>(), {
  songs: () => [],
})
</script>

<style scoped></style>
