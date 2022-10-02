<template>
  <NModal v-model:show="modalVisible" preset="card" class="w-50%">
    <NSpin :show="props.isLoading">
      <div class="mb-5 flex items-center flex-wrap">
        <NDynamicTags v-model:value="languageTagList" type="primary"></NDynamicTags>
      </div>
      <div class="flex items-center flex-wrap">
        <NDynamicTags v-model:value="typeTagList" type="info"></NDynamicTags>
      </div>
    </NSpin>
  </NModal>
</template>

<script lang="ts" setup>
import type { SongTypeOpts } from '~/types/songlist'
import { usePost, useGet } from '~/composables/request'
interface Props {
  visible: boolean
  languageList?: SongTypeOpts[]
  typeList?: SongTypeOpts[]
  isLoading: boolean
}
interface Emits {
  (e: 'update:visible', visible: boolean): void
  (e: 'refresh'): void
}
const emit = defineEmits<Emits>()
const props = defineProps<Props>()

const modalVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  },
})

const languageTagList = computed({
  get() {
    return Array.from(new Set(props.languageList?.map(item => item.name)))
  },
  set(newVal) {
    handleTagChange(languageTagList.value!, newVal, 0)
  },
})
const typeTagList = computed({
  get() {
    return Array.from(new Set(props.typeList!.map(item => item.name)))
  },
  set(newVal) {
    if (newVal) {
      handleTagChange(typeTagList.value!, newVal, 1)
    }
  },
})

const handleTagChange = async (originArr: string[], newArr: string[], type: 0 | 1) => {
  const diff = originArr
    .filter(n => !newArr?.includes(n))
    .concat(newArr!.filter(x => !originArr.includes(x)))[0]
  if (newArr.length > originArr.length) {
    const payload = {
      name: diff,
      type,
    }
    const { data: addRes, execute: addExecute } = usePost('dict/add', payload)
    await addExecute()
    if (addRes.value === true) {
      window.$message.success('操作成功')
      emit('refresh')
    }
  } else {
    let delID = 0
    if (!type) {
      delID = props.languageList!.find(n => n.name === diff)!.id
    } else {
      delID = props.typeList!.find(n => n.name === diff)!.id
    }
    const { data: delRes, execute: delExecute } = useGet('dict/del/' + delID)
    await delExecute()
    if (delRes.value === true) {
      window.$message.success('操作成功')
      emit('refresh')
    }
  }
}
</script>
