import type { messageProviderProps, dialogProviderProps, MessageProviderInst } from 'naive-ui'

declare global {
  interface Window {
    $message: MessageProviderInst
    $dialog: dialogProviderProps
  }
}
