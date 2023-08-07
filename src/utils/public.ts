import type { MessageProviderInst, MessageReactive, MessageOptions } from 'naive-ui'
import useClipboard from 'vue-clipboard3'
import { useGet } from '~/composables/request'
import type { SongTypeOpts, SongBaseTrait } from '~/types/songlist'

export const currentTheme = ref<any>(null)

export function setupMessage(NMessage: MessageProviderInst) {
  let loadingMessage: MessageReactive | null = null

  class Message {
    /**
     *
     * loading message只显示一个，新的message会替换正在显示的loading message
     * loading message不会自动清除，除非被替换成非loading message，非loading message默认2秒后自动清除
     *
     * */
    removeMessage(message: MessageReactive | null, duration = 2000) {
      setTimeout(() => {
        if (message) {
          message.destroy()
          message = null
        }
      }, duration)
    }

    showMessage(
      type: MessageReactive['type'],
      content: MessageReactive['content'],
      option = {} as MessageOptions,
    ) {
      if (loadingMessage && loadingMessage.type === 'loading') {
        // 当前存在loadingMessage 直接替换
        loadingMessage.type = type
        loadingMessage.content = content

        if (type !== 'loading') {
          this.removeMessage(loadingMessage, option.duration)
        }
      } else {
        // 当前无任何message， 新建一个， 如果是loading则保存实例
        const message = NMessage.create(content!, { ...option, type })
        if (type === 'loading') {
          loadingMessage = message
        }
      }
    }

    loading(content: MessageReactive['content']) {
      this.showMessage('loading', content, { duration: 0 })
    }

    success(content: MessageReactive['content']) {
      this.showMessage('success', content, { duration: 2000 })
    }

    error(content: MessageReactive['content']) {
      this.showMessage('error', content, { duration: 2000 })
    }

    info(content: MessageReactive['content']) {
      this.showMessage('info', content, { duration: 2000 })
    }

    warning(content: MessageReactive['content']) {
      this.showMessage('warning', content, { duration: 2000 })
    }

    destory() {
      NMessage.destroyAll()
    }

    create(content: MessageReactive['content'], option = {} as MessageOptions) {
      this.showMessage(option.type || 'default', content, option)
    }
  }

  return new Message()
}

export function arrRandChoice<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const { toClipboard } = useClipboard()
export async function copy2Clipboard(copyStr: string, successMsg: string) {
  try {
    await toClipboard(copyStr)
    window.$message.create(successMsg, { type: 'success', duration: 4000 })
  } catch (e) {
    console.error(e)
  }
}

export async function getAllSongInfo() {
  const { data, execute } = useGet<SongTypeOpts[]>('dict')
  await execute()
  const languageList: SongTypeOpts[] = []
  const typeList: SongTypeOpts[] = []
  if (data.value) {
    data.value!.forEach(item => {
      if (item.type === 0) {
        languageList.push(item)
      } else {
        typeList.push(item)
      }
    })
  }
  return { languageList, typeList }
}

export function getDataByIds(id: number[], originData: SongBaseTrait[]) {
  const checkedItems: SongBaseTrait[] = []
  id.forEach(item => {
    const temp = originData.find(n => n.id === item)
    if (temp) {
      checkedItems.push(temp)
    }
  })

  return checkedItems
}
