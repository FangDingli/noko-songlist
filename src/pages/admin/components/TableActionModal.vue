<template>
  <NModal
    v-model:show="modalVisible"
    preset="card"
    :title="props.type === 'edit' ? '编辑歌曲' : '新增歌曲'"
    class="w-50%"
  >
    <NCard v-for="(item, index) in formModel" :key="item.id">
      <div class="flex justify-end mb-4">
        <NButton v-show="formModel.length > 1" text color="red" @click="deleteFormItem(index)"
          >删除此项</NButton
        >
      </div>
      <NForm labelPlacement="left" :labelWidth="80" :model="item">
        <NGrid :cols="24" :xGap="18">
          <NFormItemGridItem :span="12" label="歌曲名" path="title">
            <NInput v-model:value="item.title"></NInput>
          </NFormItemGridItem>
          <NFormItemGridItem :span="12" label="歌手名" path="artist">
            <NInput v-model:value="item.artist"></NInput>
          </NFormItemGridItem>
          <NFormItemGridItem :span="12" label="语言" path="languageMultiSelect">
            <NSelect
              v-model:value="item.languageMultiSelect"
              multiple
              :options="languageList"
              labelField="name"
              valueField="name"
            ></NSelect>
          </NFormItemGridItem>
          <NFormItemGridItem :span="12" label="类型" path="typeMultiSelect">
            <NSelect
              v-model:value="item.typeMultiSelect"
              multiple
              :options="typeList"
              labelField="name"
              valueField="name"
            ></NSelect>
          </NFormItemGridItem>
        </NGrid>
      </NForm>
    </NCard>
    <div class="flex justify-center mt-2">
      <NButton v-show="props.type === 'add'" type="info" class="mr-5" @click="pushNewToForm">
        继续添加
      </NButton>
      <NButton type="primary" :loading="isFetching" @click="handleSubmitClick"> 提交保存 </NButton>
    </div>
  </NModal>
</template>

<script lang="ts" setup>
// 感谢 soybean-admin 提供的封装
// https://github.com/honghuangdc/soybean-admin/blob/main/src/views/management/user/components/TableActionModal.vue

import type { SongBaseTrait, SongTypeOpts } from '~/types/songlist'
import { usePost } from '~/composables/request'

type ModalType = 'add' | 'edit'

interface Props {
  visible: boolean
  type?: ModalType
  editData?: SongBaseTrait | null
  languageList?: SongTypeOpts[] | undefined
  typeList?: SongTypeOpts[] | undefined
}

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null,
  languageList: undefined,
  typeList: undefined,
})

interface Emits {
  (e: 'update:visible', visible: boolean): void
  (e: 'refresh'): void
}

const emit = defineEmits<Emits>()

const modalVisible = computed({
  get() {
    return props.visible
  },
  set(visible) {
    emit('update:visible', visible)
  },
})

/* const title = computed(() => {
  const text: Record<ModalType, string> = {
    add: '添加',
    edit: '编辑',
  }
  return text[props.type]
}) */

// 我还是建议语言为单选，但这里甲方要求多选（x）
interface FormModel extends Partial<SongBaseTrait> {
  typeMultiSelect?: string[]
  languageMultiSelect?: string[]
}

let autoIncreId = ref(0)

const pushNewToForm = () => {
  autoIncreId.value++
  formModel.value.push(createDefaultFormModel())
}

const deleteFormItem = (index: number) => {
  formModel.value.splice(index, 1)
}

const createDefaultFormModel = (): FormModel => ({
  id: autoIncreId.value,
  title: '',
  artist: '',
  language: '',
  type: '',
  typeMultiSelect: [],
  languageMultiSelect: [],
})

let formModel = ref<FormModel[]>([createDefaultFormModel()])

const handleUpdateFormModel = (model: FormModel) => {
  Object.assign(formModel.value[0], model)
}

const addOrEditHandlers: Record<ModalType, () => void> = {
  add: () => {
    const defaultFormModel = createDefaultFormModel()
    handleUpdateFormModel(defaultFormModel)
  },
  edit: () => {
    if (props.editData) {
      handleUpdateFormModel(props.editData)
      if (props.editData.type.length > 0) {
        formModel.value[0].typeMultiSelect = formModel.value[0].type?.split(';')
      } else {
        formModel.value[0].typeMultiSelect = undefined
      }
      if (props.editData.language.length > 0) {
        formModel.value[0].languageMultiSelect = formModel.value[0].language?.split(';')
      } else {
        formModel.value[0].languageMultiSelect = undefined
      }
    }
  },
}

const handleUpdateFormModelByModalType = () => {
  addOrEditHandlers[props.type]()
}

watch(
  () => props.visible,
  newVal => {
    if (newVal) {
      handleUpdateFormModelByModalType()
    } else {
      formModel.value = [createDefaultFormModel()]
    }
  }
)

const beforeUpload = () => {
  const submitKey = props.type === 'add' ? 'songAdd' : 'songUpdate'
  formModel.value.forEach(item => {
    if (!item.typeMultiSelect || item.typeMultiSelect.length === 0) {
      item.type = ''
    } else {
      item.type = item.typeMultiSelect?.join(';')
    }
    if (!item.languageMultiSelect || item.languageMultiSelect.length === 0) {
      item.language = ''
    } else {
      item.language = item.languageMultiSelect?.join(';')
    }

    if (submitKey === 'songAdd') {
      delete item.id
    }
  })

  return submitKey
}

// let uploadData: Record<string, FormModel[]> = {}
let uploadData = ref<Record<string, FormModel[]>>({})
const { data, execute, isFetching } = usePost<FormModel[]>('songlist/batch', uploadData)
const handleSubmitClick = async () => {
  const submitKey = beforeUpload()
  uploadData.value = {
    [submitKey]: formModel.value,
  }

  // isLoading = isFetching
  await execute()
  // @ts-ignore
  if (data.value === true) {
    window.$message.success('操作成功')
  }
  emit('refresh')
}
</script>
