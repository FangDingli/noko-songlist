import type { SongBaseTrait, SongTypeOpts } from '~/types/songlist'
import { useGetSonglist, useGetSongOptList } from '~/composables/crud'

interface songlistStateProps {
  originSong: SongBaseTrait[]
  searchedSong: SongBaseTrait[]
  languageOptList: SongTypeOpts[]
  typeOptList: SongTypeOpts[]
  songlistLoading: boolean
  optListLoading: boolean
}

interface stateFuncReturn {
  songlistState: songlistStateProps
  getSonglist(): void
  getOptList(): void
}

export const useSonglistState = createGlobalState((): stateFuncReturn => {
  const songlistState = reactive<songlistStateProps>({
    originSong: [],
    searchedSong: [],
    languageOptList: [],
    typeOptList: [],
    songlistLoading: false,
    optListLoading: false,
  })

  const getSonglist = async () => {
    songlistState.songlistLoading = true
    const { data, searchedData } = await useGetSonglist()
    songlistState.originSong = data.value!
    songlistState.searchedSong = searchedData
    songlistState.songlistLoading = false
  }

  const getOptList = async () => {
    songlistState.optListLoading = true
    const { typeOptList, languageOptList } = await useGetSongOptList()
    songlistState.typeOptList = typeOptList.value
    songlistState.languageOptList = languageOptList.value
    songlistState.optListLoading = false
  }

  return { songlistState, getSonglist, getOptList }
})

interface globalStateProps {
  isDarkMode: boolean
}

interface globalStateFuncReturn {
  globalState: globalStateProps
  setDarkMode(mode: boolean): void
}

export const useGlobalState = createGlobalState((): globalStateFuncReturn => {
  const globalState = reactive<globalStateProps>({
    isDarkMode: false,
  })

  const setDarkMode = (mode: boolean) => {
    globalState.isDarkMode = mode
  }

  return { globalState, setDarkMode }
})
