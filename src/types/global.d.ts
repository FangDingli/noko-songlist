import type { messageProviderProps, dialogProviderProps } from 'naive-ui'

declare global {
  interface Window {
    $message: messageProviderProps
    $dialog: dialogProviderProps
  }
}
