<route lang="json">
{
  "meta": {
    "isAuth": true
  }
}
</route>

<template>
  <div class="h-10vh w-full" flex="~ col">
    <div class="justify-around items-center m-y-3" flex="~">
      <div>
        <NButton type="primary" @click="addSong">
          <template #icon>
            <i i-ant-design-plus-outlined></i>
          </template>
          新增
        </NButton>
      </div>
      <div class="w-30%">
        <NInput v-model:value="searchValue" placeholder="输入歌名或歌手搜索"></NInput>
      </div>
      <div class="w-20%" flex="~">
        <NSelect
          v-model:value="languageSelectd"
          placeholder="请选择语言"
          :options="languageOptList"
          labelField="name"
          valueField="name"
          clearable
          @update:value="data = tableFilterHandler.languageSelect(originData, languageSelectd)"
        ></NSelect>
        <NButton type="warning" secondary>
          <template #icon>
            <i i-ant-design-setting-outlined></i>
          </template>
          管理
        </NButton>
      </div>
      <div class="w-20%" flex="~">
        <NSelect
          v-model:value="typeSelected"
          placeholder="请选择风格"
          :options="typeOptList"
          labelField="name"
          valueField="name"
          clearable
          @update:value="data = tableFilterHandler.typeSelect(originData, typeSelected)"
        ></NSelect>
        <NButton type="warning" secondary>
          <template #icon>
            <i i-ant-design-setting-outlined></i>
          </template>
          管理
        </NButton>
      </div>
    </div>
    <div flex="~">
      <div class="m-x-3">勾选歌曲批量设置：</div>
      <div class="w-10%" flex="~">
        <NSelect
          v-model:value="batchSetLanguage"
          placeholder="统一设置歌曲语种"
          :options="languageOptList"
          labelField="name"
          valueField="name"
          clearable
        ></NSelect>
      </div>
      <div class="w-10%" flex="~">
        <NSelect
          v-model:value="batchSetType"
          placeholder="统一追加歌曲风格"
          :options="typeOptList"
          labelField="name"
          valueField="name"
        ></NSelect>
      </div>
      <div>
        <NButton type="primary" :loading="batchLoading" class="mr-5" @click="submitBatch"
          >提交更改</NButton
        >
      </div>
      <div>
        <NButton type="error" @click="handleMultiDel">
          <template #icon>
            <i i-ant-design-delete-outlined></i>
          </template>
          删除选中歌曲
        </NButton>
      </div>
    </div>
  </div>
  <NDataTable
    :loading="isFetching"
    :data="data!"
    :columns="columns"
    virtualScroll
    :maxHeight="'88vh'"
    :rowKey="rowData => rowData.id"
    @update:checkedRowKeys="handleCheck"
  ></NDataTable>

  <TableActionModal
    v-model:visible="actionModalVisible"
    v-model:type="modalType"
    :editData="editData"
    :languageList="languageOptList"
    :typeList="typeOptList"
  ></TableActionModal>
</template>

<script lang="ts" setup>
import { useGetSonglist, useGetSongOptList } from '~/composables/crud'
import { tableFilterHandler } from '~/composables/songlist'
import type { SongBaseTrait } from '~/types/songlist'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NPopconfirm } from 'naive-ui'
import TableActionModal from './components/TableActionModal.vue'
import { usePost } from '~/composables/request'
import { getDataByIds } from '~/utils'

type ModalType = 'add' | 'edit'

let actionModalVisible = ref(false)
let modalType = ref<ModalType>('add')
let editData = ref<SongBaseTrait | null>(null)

const addSong = () => {
  actionModalVisible.value = true
  modalType.value = 'add'
}

const editSong = (row: SongBaseTrait) => {
  modalType.value = 'edit'
  actionModalVisible.value = true
  editData.value = row
}

const columns: DataTableColumns<SongBaseTrait> = [
  {
    type: 'selection',
  },
  {
    title: '歌名',
    key: 'title',
  },
  {
    title: '歌手',
    key: 'artist',
  },
  {
    title: '语种',
    key: 'language',
  },
  {
    title: '类型',
    key: 'type',
  },
  {
    title: '操作',
    key: 'options',
    render: row => {
      return [
        h(
          NButton,
          {
            secondary: true,
            type: 'info',
            size: 'small',
            class: 'mr-2',
            onClick: () => {
              editSong(row)
            },
          },
          {
            default: () => '编辑',
            icon: () => h('i', { class: 'i-ant-design-edit-outlined' }),
          }
        ),
        h(
          NPopconfirm,
          {
            onPositiveClick: () => {
              batchArr.value.songDel.push(row)
              handleDelete()
            },
          },
          {
            default: () => '确认删除此歌曲？',
            icon: () =>
              h('i', {
                class: 'i-ant-design-question-circle-outlined',
                color: 'red',
              }),
            trigger: () =>
              h(
                NButton,
                {
                  secondary: true,
                  type: 'error',
                  size: 'small',
                },
                {
                  default: () => '删除',
                  icon: () => h('i', { class: 'i-ant-design-delete-outlined' }),
                }
              ),
          }
        ),
      ]
    },
  },
]

const { data, originData, isFetching } = useGetSonglist()
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

const batchArr = ref<Record<'songDel' | 'songUpdate', SongBaseTrait[]>>({
  songDel: [],
  songUpdate: [],
})
const {
  data: batchRes,
  execute,
  isFetching: batchLoading,
} = usePost<SongBaseTrait[]>('songlist/batch', batchArr)
const handleDelete = async () => {
  await execute()
  // @ts-ignore
  if (batchRes.value === true) {
    window.$message.success('操作成功')
  }
  batchArr.value.songDel = []
}

let checkedKeys = ref<number[]>([])
const dialog = useDialog()
const handleCheck = (rowKeys: number[]) => {
  checkedKeys.value = rowKeys
}
const handleMultiDel = () => {
  const d = dialog.warning({
    title: '警告',
    content: '是否确认删除所有选中歌曲',
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: async () => {
      d.loading = true
      const items = getDataByIds(checkedKeys.value, originData.value)
      batchArr.value.songDel = items
      await execute()
      // @ts-ignore
      if (batchRes.value === true) {
        window.$message.success('操作成功')
      }
      d.loading = false
      return true
    },
  })
}

const batchSetLanguage = ref(null)
const batchSetType = ref<string[]>([])

const submitBatch = async () => {
  const items = getDataByIds(checkedKeys.value, originData.value)
  items.forEach(item => {
    if (batchSetLanguage.value) {
      item.language = batchSetLanguage.value
    }

    if (batchSetType.value && batchSetType.value.length > 0) {
      const originTypeArr = item.type.split(',')
      const resultTypeArr = Array.from(new Set([...originTypeArr, ...batchSetType.value]))
      item.type = resultTypeArr.join()
    }
  })
  await execute()
  // @ts-ignore
  if (batchRes.value === true) {
    window.$message.success('操作成功')
  }
}
</script>
