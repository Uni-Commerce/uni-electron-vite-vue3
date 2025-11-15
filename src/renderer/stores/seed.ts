import { defineStore } from 'pinia'

export const useSeedPhrase = defineStore('seedPhrase', () => {
  const seedPhrases = ref<any[]>([])
  const hasBackup = ref<boolean>(false)

  const saveSeedPhrases = async (values: any) => {
    seedPhrases.value = values
    hasBackup.value = true
    try {
      // await setStorage('seedPhrases', JSON.stringify(values))
    } catch (error) {
      console.error('Failed to save seed phrases:', error)
    }
  }

  const handleSetBackup = (value: boolean) => {
    hasBackup.value = value
  }

  return {
    hasBackup,
    seedPhrases,
    saveSeedPhrases,
    handleSetBackup
  }
})
