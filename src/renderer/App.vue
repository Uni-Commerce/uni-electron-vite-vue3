<template>
  <div
    class="relative overflow-hidden bg-screen"
    :style="{
      height: `${container.height - scrollbar}px`,
      maxHeight: `${container.height - scrollbar}px`,
      width: `${container.width}px`,
      maxWidth: `${container.width}px`
    }"
  >
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
const container = reactive({
  width: 1024,
  height: 686
})
const scrollbar = ref<number>(26)

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
