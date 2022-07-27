import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import '@unocss/reset/normalize.css'
// import './styles/main.css'
import 'uno.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
