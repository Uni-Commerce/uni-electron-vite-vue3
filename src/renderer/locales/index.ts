import { createI18n } from 'vue-i18n'

import zhCN from './zh_cn.json'
import enUS from './en.json'

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof enUS

const i18n = createI18n<[MessageSchema], 'en-US' | 'zh-CN'>({
  globalInjection: true,
  legacy: false,
  locale: localStorage.fb_lang || 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n
