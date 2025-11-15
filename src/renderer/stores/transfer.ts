import { defineStore } from 'pinia'

interface Values {
  type?: string
  toAddress?: string
  toAmount?: string
  toPrice?: number
}

export const useTransfer = defineStore('transfer', () => {
  const currentCoin = ref<any>(null)
  const destinationChain = ref<Values | null>(null)

  const setCurrentCoin = (values: any) => {
    currentCoin.value = values
  }

  const setDestinationChain = (values: Values) => {
    destinationChain.value = {
      ...destinationChain.value,
      ...values
    }
  }

  const reset = () => {
    currentCoin.value = null
    destinationChain.value = null
  }

  return {
    currentCoin,
    destinationChain,
    setCurrentCoin,
    setDestinationChain,
    reset
  }
})
