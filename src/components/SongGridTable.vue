<template>
  <div grid="~ cols-1" class="font-loli" text="white 20px lt-sm:16px">
    <div
      grid="~ cols-[2fr_1fr_1fr_1fr] gap-2 lt-sm:cols-[2fr_1fr] lt-sm:gap-0"
      class="h-50px bg-blue bg-op-50"
    >
      <div class="pl-5% self-center">歌曲名称</div>
      <div class="self-center">歌手</div>
      <div class="self-center" lt-sm="hidden">语言</div>
      <div class="self-center" lt-sm="hidden">风格</div>
    </div>
    <div
      v-for="item in props.songs"
      :key="item.id"
      grid="~ cols-[2fr_1fr_1fr_1fr] lt-sm:cols-[2fr_1fr] gap-2"
      m="y-1"
      p="y-2"
      hover="bg-white bg-op-40"
      transition="~ duration-200 ease-in-out"
      border="0 rounded-2"
      @click="copy(item.title, item.artist)"
    >
      <div class="truncate pl-5%">{{ item.title }}</div>
      <div class="truncate">{{ item.artist }}</div>
      <div class="truncate" lt-sm="text-12px pl-5%">{{ item.language }}</div>
      <div class="truncate" lt-sm="text-12px">{{ item.type }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SongBaseTrait } from '~/types/songlist'
import { copy2Clipboard } from '~/utils'

const props = withDefaults(defineProps<{ songs: SongBaseTrait[] | null }>(), {
  songs: () => [],
})

const copy = async (name: string, singer: string) => {
  await copy2Clipboard(`点歌 ${name} ${singer}`, `《${name}》 复制成功，快去直播间点歌吧！`)
}
</script>

<style scoped></style>
