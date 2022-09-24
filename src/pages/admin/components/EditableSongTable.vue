<template>
  <NDataTable :loading="props.isLoading" :data="props.data" :columns="columns"></NDataTable>
</template>

<script lang="ts" setup>
import type { ISongInfo } from '~/types/songlist'
import type { DataTableColumns } from 'naive-ui'
import { NButton } from 'naive-ui'

const props = defineProps<{
  isLoading: boolean
  data: ISongInfo[] | undefined
}>()
const columns: DataTableColumns<ISongInfo> = [
  {
    title: '歌名',
    key: 'title',
  },
  {
    title: '歌手',
    key: 'artist',
  },
  {
    title: '操作',
    key: 'options',
    render() {
      return h(NButton, { secondary: true }, () => ['编辑'])
    },
  },
]
</script>
