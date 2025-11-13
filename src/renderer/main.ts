import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/renderer/router'
import i18n from '@/renderer/locales'
import App from './App.vue'
import './styles/tailwind.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
app.use(router)
app.use(ElementPlus, {})
app.use(pinia)

app.mount('#app').$nextTick(() => {
  // Use contextBridge
  if (window.ipcRenderer) {
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      console.info(message)
    })
  }
})
