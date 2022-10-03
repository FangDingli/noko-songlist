import { useGet } from '~/composables/request'
import type { SongBaseTrait, SongTypeOpts } from '~/types/songlist'

export const useGetSonglist = async () => {
  const { data, execute } = useGet<SongBaseTrait[]>('songlist').json()
  await execute()
  data.value.forEach((item: SongBaseTrait, index: number) => {
    item.orderNum = index + 1
  })
  const searchedData = [...data.value]
  return { data, searchedData }
}

export const useGetSongOptList = async () => {
  const { data, execute } = useGet<SongTypeOpts[]>('dict').json()
  const typeOptList = ref<SongTypeOpts[]>([])
  const languageOptList = ref<SongTypeOpts[]>([])
  await execute()

  if (data.value) {
    data.value.forEach((item: SongTypeOpts) => {
      if (!item.name) {
        item.name = '无效标签'
      }
      if (item.type === 0) {
        languageOptList.value.push(item)
      }
      if (item.type === 1) {
        typeOptList.value.push(item)
      }
    })
  }
  return { typeOptList, languageOptList }
}

/* export const useGetSonglist = (immediate = true) => {
  const { data, execute, isFetching } = useGet<SongBaseTrait[]>('songlist')
  const originData = ref<SongBaseTrait[]>([])
  const loadData = async () => {
    if (isFetching.value) return
    await execute()
    originData.value = [...data.value!]
  }

  unref(immediate) && loadData()
  return {
    data,
    isFetching,
    originData,
    loadData,
  }
}

export const useGetSongOptList = (immediate = true) => {
  const { data, execute, isFetching } = useGet<SongTypeOpts[]>('dict')
  const typeOptList = ref<SongTypeOpts[]>([])
  const languageOptList = ref<SongTypeOpts[]>([])
  const loadData = async () => {
    if (isFetching.value) return
    await execute()
    if (data.value) {
      data.value.forEach(item => {
        if (!item.name) {
          item.name = '1'
        }
        if (item.type === 0) {
          languageOptList.value.push(item)
        }
        if (item.type === 1) {
          typeOptList.value.push(item)
        }
      })
    }
  }

  unref(immediate) && loadData()
  return {
    data,
    isFetching,
    typeOptList,
    languageOptList,
    loadData,
  }
} */
