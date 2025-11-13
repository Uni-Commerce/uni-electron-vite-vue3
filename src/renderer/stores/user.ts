import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref<any>(null)
  const token = ref(null)
  const hasWallet = ref<boolean>(false)
  const walletList = ref<
    Array<{
      name: string
      password: string
      address: string
      isActive: boolean
    }>
  >([])

  const activeWallet = computed(() => {
    return walletList.value.find((item) => item.isActive)
  })

  const handleSetWallet = async (values: any) => {
    const match = walletList.value.find((item) => item.name === values)
    if (match) return false
    const array = walletList.value.map((item) => {
      return {
        ...item,
        isActive: false
      }
    })
    walletList.value = [...array, values]
    try {
      // await setStorage('wallet', {
      //   name: values.name,
      //   password: values.password,
      //   address: values.address,
      //   isActive: values.isActive
      // })
      // await setStorage('walletData', JSON.stringify(walletList.value))
    } catch (error) {
      console.error('Failed to save wallet:', error)
    }
    hasWallet.value = walletList.value.length > 0
  }

  return {
    activeWallet,
    user,
    token,
    hasWallet,
    walletList,
    handleSetWallet
  }
})
