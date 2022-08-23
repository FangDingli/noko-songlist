import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'sl-text': 'text-white ',
    },
  ],
  rules: [],
  theme: {},
  presets: [presetUno(), presetIcons(), presetAttributify()],
})
