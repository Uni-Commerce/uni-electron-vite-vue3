<template>
  <div class="relative h-[686px] max-h-[686px] w-[1024px] max-w-[1024px] overflow-hidden bg-screen">
    <router-view />
    <app-global-tools />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'
import { useAppStore } from '@/renderer/stores'

const appStore = useAppStore()
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})
const { theme } = storeToRefs(appStore)
const toggleTheme = useToggle(isDark)

onBeforeMount(() => {
  appStore.setTheme(isDark.value ? 'dark' : 'light')
})

// 监听 theme 变化，自动切换主题
watchEffect(() => {
  if (isDark.value) {
    if (theme.value === 'light') toggleTheme()
  } else {
    if (theme.value === 'dark') toggleTheme()
  }
})
</script>
