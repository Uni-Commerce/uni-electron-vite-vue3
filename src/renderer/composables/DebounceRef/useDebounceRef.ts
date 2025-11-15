import { customRef } from 'vue'

export const useDebounceRef = <T>(value: T, delay = 200) => {
  let timeout: number

  return customRef((track, trigger) => {
    return {
      get() {
        track() // 追逐依赖
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)

        timeout = window.setTimeout(() => {
          value = newValue
          trigger() // 触发更新
        }, delay)
      }
    }
  })
}
