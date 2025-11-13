import { defineStore } from 'pinia'

export const SUPPORTED_LANGUAGES = ['zh-CN', 'en-US']
export const SUPPORTED_THEMES = ['light', 'dark']

export const useAppStore = defineStore('app', {
  state: () => ({
    language: 'en-US',
    theme: ''
  }),
  getters: {
    currentLanguage(state) {
      return state.language
    },
    currentTheme(state) {
      return state.theme
    }
  },
  actions: {
    setLanguage(lang: string) {
      if (SUPPORTED_LANGUAGES.includes(lang)) {
        this.language = lang
      }
    },
    setTheme(theme: string) {
      if (SUPPORTED_THEMES.includes(theme)) {
        this.theme = theme
      }
    }
  }
})
