import 'vue-i18n'
import enUS from '@/popup/locales/en.json'

type LocaleMessage = typeof enUS

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends LocaleMessage {}
}
