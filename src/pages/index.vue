<template>
  <main class="bg_img noko_cursor z-0 bg-fixed pt-60vh bg-cover bg-no-repeat" lt-sm="pt-30vh">
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
              :options="state.songlistState.languageOptList"
              labelField="name"
              valueField="name"
              clearable
              @update:value="
                state.songlistState.searchedSong = tableFilterHandler.languageSelect(
                  state.songlistState.originSong,
                  languageSelectd
                )
              "
            ></NSelect>
          </div>
          <div lt-sm="hidden">
            <NSelect
              v-model:value="typeSelected"
              class="songlist_selection"
              placeholder="请选择风格"
              :options="state.songlistState.typeOptList"
              labelField="name"
              valueField="name"
              clearable
              @update:value="
                state.songlistState.searchedSong = tableFilterHandler.typeSelect(
                  state.songlistState.originSong,
                  typeSelected
                )
              "
            ></NSelect>
          </div>
        </NokoCompConfig>
        <SongGridTable :songs="state.songlistState.searchedSong"></SongGridTable>
        <div
          v-show="
            !state.songlistState.searchedSong || state.songlistState.searchedSong.length === 0
          "
          text="center white 20px lt-sm:16px"
        >
          查不到捏~
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useSonglistState } from '~/store'
import SongGridTable from '~/components/SongGridTable.vue'
import NokoCompConfig from '~/components/NokoCompConfig.vue'
import type { SongBaseTrait } from '~/types/songlist'
import { tableFilterHandler } from '~/composables/songlist'
import { arrRandChoice, copy2Clipboard } from '~/utils'

/* const { data, originData } = useGetSonglist()
const { typeOptList, languageOptList } = useGetSongOptList() */

const state = useSonglistState()
state.getSonglist()
state.getOptList()

let searchValue = ref('')
let languageSelectd = ref(null)
let typeSelected = ref(null)

watchDebounced(
  searchValue,
  () => {
    state.songlistState.searchedSong = tableFilterHandler.searchbar(
      state.songlistState.originSong,
      searchValue.value
    )
  },
  { debounce: 500, maxWait: 1500 }
)

const handleRandomClick = async () => {
  const result = arrRandChoice<SongBaseTrait>(state.songlistState.originSong)
  const temp = `点歌 ${result.title} ${result.artist}`
  if (temp.length > 20) {
    await copy2Clipboard(temp, `《${result.title}》 复制成功，快去直播间点歌吧！`)
  } else {
    await copy2Clipboard(`点歌 ${result.title}`, `《${result.title}》 复制成功，快去直播间点歌吧！`)
  }
}
</script>

<style scoped>
.bg_img {
  background-image: url('~/assets/image/songlist_bg1.jpg');
}
@media screen and (max-width: 639.9px) {
  .bg_img {
    background-position: top 0 left 75%;
  }
}

.noko_cursor {
  cursor: url('~/assets/image/mousecursor.png'), auto;
}
</style>
