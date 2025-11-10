import { createApp } from 'vue'

import App from './App.vue'
import './styles/tailwind.scss'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    // Use contextBridge
    if (window.ipcRenderer) {
      window.ipcRenderer.on('main-process-message', (_event, message) => {
        console.info(message)
      })
    }
  })
