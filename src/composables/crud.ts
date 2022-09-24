import { useGet } from '~/composables/request'
import type { SongBaseTrait, SongTypeOpts } from '~/types/songlist'

export const useGetSonglist = (immediate = true) => {
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
      data.value!.forEach(item => {
        if (item.type === 0) {
          languageOptList.value.push(item)
        } else {
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
}
