<template>
  <main class="bg_img noko_cursor z-0 bg-fixed pt-90vh bg-cover bg-no-repeat">
    <a href="https://live.bilibili.com/22882574" target="_blank">
      <div class="w-10% z-2 fixed left-0 top-10%">
        <img src="../assets/image/logo.png" w-full alt="" />
      </div>
    </a>

    <div class="z-1 bg-blue bg-op-20 backdrop-blur-20px min-h-screen">
      <div class="w-80% m-x-auto lt-sm:w-full">
        <NokoCompConfig grid="~ cols-[2fr_1fr_1fr_1fr] lt-sm:cols-[2fr_1fr] gap-2" m="y-2">
          <div class="w-80% p-y-1">
            <NInput v-model:value="searchValue" placeholder="输入歌名或歌手搜索"></NInput>
          </div>
          <div class="w-80% p-y-1">
            <NButton class="mr-1" type="primary" @click="handleRandomClick">盲盒点歌</NButton>
            <NButton type="default" color="#F4F6F6" textColor="black" @click="filterList = data"
              >显示全部</NButton
            >
          </div>
          <div class="w-80% p-y-1"><NSelect placeholder="请选择语言"></NSelect></div>
          <div class="w-80% p-y-1"><NSelect placeholder="请选择风格"></NSelect></div>
        </NokoCompConfig>
        <SongGridTable :songs="filterList"></SongGridTable>
        <div v-show="!filterList || filterList.length === 0" text="center white 20px lt-sm:16px">
          查不到捏~
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import SongGridTable from '~/components/SongGridTable.vue'
import NokoCompConfig from '~/components/NokoCompConfig.vue'
import { useGet } from '~/composables/request'
import type { ISongInfo } from '~/types/songlist'
import { useFilterByNameAndSinger } from '~/composables/songlist'
import { arrRandChoice } from '~/utils'

const { data, execute } = useGet<ISongInfo[]>('/songlist')

let filterList = ref<ISongInfo[] | null>([])

const getList = async () => {
  await execute()
  filterList.value = data.value
}

getList()

let searchValue = ref('')

watchDebounced(
  searchValue,
  () => {
    if (searchValue.value !== '') {
      filterList.value = useFilterByNameAndSinger(data.value!, searchValue.value)
    } else {
      filterList.value = data.value
    }
  },
  { debounce: 500, maxWait: 1500 }
)

const handleRandomClick = () => {
  filterList.value = [arrRandChoice<ISongInfo>(data.value!)]
}
</script>

<style scoped>
.bg_img {
  background-image: url('~/assets/image/songlist_bg1.png');
}
.noko_cursor {
  cursor: url('~/assets/image/mousecursor.png'), auto;
}
</style>
