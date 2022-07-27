import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  theme: {

  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
