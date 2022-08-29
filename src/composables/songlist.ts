import type { ISongInfo } from '~/types/songlist'

export const useFilterByNameAndSinger = (songlist: ISongInfo[], searchStr: string) => {
  const result: ISongInfo[] = []

  songlist.forEach(item => {
    const str = item.title + item.artist
    if (str.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) {
      result.push(item)
    }
  })

  return result
}

export const useFilterByLanguage = (songlist: ISongInfo[], searchStr: string) => {
  const result: ISongInfo[] = []

  songlist.forEach(item => {
    if (item.language === searchStr) {
      result.push(item)
    }
  })

  return result
}

export const useFilterByType = (songlist: ISongInfo[], searchStr: string) => {
  const result: ISongInfo[] = []

  songlist.forEach(item => {
    if (item.type.indexOf(searchStr) !== -1) {
      result.push(item)
    }
  })

  return result
}
