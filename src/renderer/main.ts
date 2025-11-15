import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import 'element-plus/dist/index.css'

import { autoImportComponents } from '@/renderer/utils'
import router from '@/renderer/router'
import i18n from '@/renderer/locales'
import App from './App.vue'
import './styles/tailwind.scss'

let locale: any = {}

if (i18n.global.fallbackLocale === 'zh-CN') {
  locale = zhCn
} else {
  locale = en
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(ElementPlus, {
  locale
})
app.use(autoImportComponents)

app.mount('#app').$nextTick(() => {
  // Use contextBridge
  if (window.ipcRenderer) {
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      console.info(message)
    })
  }
})
