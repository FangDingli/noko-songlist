import type { MessageOptions, MessageReactive, MessageProviderInst } from 'naive-ui'

export function appMessage(
  type: MessageReactive['type'],
  message: MessageReactive['content'],
  option = {} as MessageOptions
): MessageProviderInst {
  return window.$message(Object.assign(option, { type, message }))
}
