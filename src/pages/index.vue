<template>
  <main
    class="bg_img noko_cursor z-0 bg-fixed pt-90vh bg-cover bg-no-repeat"
    :class="{ bg_img_mobile: isSmallScreen }"
  >
    <a href="https://live.bilibili.com/22882574" target="_blank">
      <div class="w-10% z-2 fixed left-0 top-10%" lt-sm="invisible">
        <img src="../assets/image/logo.png" w-full alt="" />
      </div>
    </a>

    <div class="z-1 bg-blue bg-op-20 backdrop-blur-20px min-h-screen">
      <div class="w-80% m-x-auto lt-sm:w-full">
        <NokoCompConfig grid="~ cols-[2fr_1fr_1fr_1fr] lt-sm:cols-[2fr_1fr] gap-4" m="y-2" p="y-2">
          <NInput v-model:value="searchValue" round placeholder="输入歌名或歌手搜索"></NInput>

          <NButton class="mr-1" type="primary" round @click="handleRandomClick">盲盒点歌</NButton>
          <!-- <NButton type="default" color="#F4F6F6" textColor="black" @click="filterList = data"
              >显示全部</NButton
            > -->

          <div lt-sm="hidden">
            <NSelect
              v-model:value="languageSelectd"
              class="songlist_selection"
              placeholder="请选择语言"
              :options="languageOptList"
              labelField="name"
              valueField="name"
              clearable
              @update:value="data = tableFilterHandler.languageSelect(originData, languageSelectd)"
            ></NSelect>
          </div>
          <div lt-sm="hidden">
            <NSelect
              v-model:value="typeSelected"
              class="songlist_selection"
              placeholder="请选择风格"
              :options="typeOptList"
              labelField="name"
              valueField="name"
              clearable
              @update:value="data = tableFilterHandler.typeSelect(originData, typeSelected)"
            ></NSelect>
          </div>
        </NokoCompConfig>
        <SongGridTable :songs="data"></SongGridTable>
        <div v-show="!data || data.length === 0" text="center white 20px lt-sm:16px">查不到捏~</div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useGetSonglist, useGetSongOptList } from '~/composables/crud'
import SongGridTable from '~/components/SongGridTable.vue'
import NokoCompConfig from '~/components/NokoCompConfig.vue'
import type { SongBaseTrait } from '~/types/songlist'
import { tableFilterHandler } from '~/composables/songlist'
import { arrRandChoice, copy2Clipboard } from '~/utils'

const { data, originData } = useGetSonglist()
const { typeOptList, languageOptList } = useGetSongOptList()

let searchValue = ref('')
let languageSelectd = ref(null)
let typeSelected = ref(null)

watchDebounced(
  searchValue,
  () => {
    data.value = tableFilterHandler.searchbar(originData.value, searchValue.value)
  },
  { debounce: 500, maxWait: 1500 }
)

const handleRandomClick = async () => {
  const result = arrRandChoice<SongBaseTrait>(data.value!)
  await copy2Clipboard(
    `点歌 ${result.title} ${result.artist}`,
    `《${result.title}》 复制成功，快去直播间点歌吧！`
  )
}

const isSmallScreen = useMediaQuery('(max-width: 639.9px)')
</script>

<style scoped>
.bg_img {
  background-image: url('~/assets/image/songlist_bg1.jpg');
}
.bg_img_mobile {
  background-position: top 0 left 75%;
}
.noko_cursor {
  cursor: url('~/assets/image/mousecursor.png'), auto;
}
</style>
