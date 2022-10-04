import type { SongBaseTrait } from '~/types/songlist'

export const useFilterByNameAndSinger = (
  songlist: SongBaseTrait[],
  searchStr: FilterHandlerParam2
) => {
  const result: SongBaseTrait[] = []

  if (!searchStr || searchStr === '') {
    return songlist
  }

  songlist.forEach(item => {
    const str = item.title + item.artist
    if (str.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) {
      result.push(item)
    }
  })

  return result
}

export const useFilterByLanguage = (songlist: SongBaseTrait[], searchStr: FilterHandlerParam2) => {
  const result: SongBaseTrait[] = []

  if (!searchStr || searchStr === '') {
    return songlist
  }

  songlist.forEach(item => {
    if (item.language.indexOf(searchStr) !== -1) {
      result.push(item)
    }
  })

  return result
}

export const useFilterByType = (songlist: SongBaseTrait[], searchStr: FilterHandlerParam2) => {
  const result: SongBaseTrait[] = []

  if (!searchStr || searchStr === '') {
    return songlist
  }

  songlist.forEach(item => {
    if (item.type.indexOf(searchStr) !== -1) {
      result.push(item)
    }
  })

  return result
}

type FilterTableDataAction = 'searchbar' | 'languageSelect' | 'typeSelect'
type FilterHandlerParam2 = string | undefined | null

export const tableFilterHandler: Record<
  FilterTableDataAction,
  (a: SongBaseTrait[], b: FilterHandlerParam2) => SongBaseTrait[]
> = {
  searchbar: (a: SongBaseTrait[], b: FilterHandlerParam2) => useFilterByNameAndSinger(a, b),
  languageSelect: (a: SongBaseTrait[], b: FilterHandlerParam2) => useFilterByLanguage(a, b),
  typeSelect: (a: SongBaseTrait[], b: FilterHandlerParam2) => useFilterByType(a, b),
}
