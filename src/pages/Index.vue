<template>
  <main class="bg_img z-0 bg-fixed pt-90vh bg-cover bg-no-repeat">
    <div class="z-1 bg-blue bg-op-20 backdrop-blur-20px">
      <div class="w-80% m-x-auto lt-sm:w-full">
        <div grid="~ cols-[2fr_1fr_1fr_1fr] lt-sm:cols-[2fr_1fr] gap-2" m="y-2">
          <div class="w-80% p-y-1">
            <NInput v-model:value="searchValue" placeholder="输入歌名搜索"></NInput>
          </div>
          <div class="w-80% p-y-1"><NButton type="primary">盲盒点歌</NButton></div>
          <div class="w-80% p-y-1"><NSelect></NSelect></div>
          <div class="w-80% p-y-1"><NSelect></NSelect></div>
        </div>
        <SongGridTable :songs="songs"></SongGridTable>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import SongGridTable from '~/components/SongGridTable.vue'
import { useGet } from '~/composables/request'
import type { ISongInfo } from '~/types/songlist'

const songs = ref<ISongInfo[] | null>([])
const { data, execute } = useGet<ISongInfo[]>('/songlist')

const getList = async () => {
  await execute()
  songs.value = data.value
}

getList()

let searchValue = ref('')
</script>

<style>
.bg_img {
  background-image: url('~/assets/image/songlist_bg1.png');
}
</style>
