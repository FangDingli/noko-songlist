export interface SongBaseTrait {
  id: number
  title: string
  artist: string
  language: string
  type: string
  orderNum?: number
}

export interface SongTypeOpts {
  id: number
  name: string
  type: 0 | 1
}
