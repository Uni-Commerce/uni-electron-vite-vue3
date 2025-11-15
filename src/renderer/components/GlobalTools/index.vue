<template>
  <div
    v-if="visible"
    ref="target"
    class="draggable"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      zIndex: 9999,
      backgroundColor: isDarkTheme ? '#333' : '#fff',
      color: isDarkTheme ? '#fff' : '#333',
      borderColor: isDarkTheme ? '#666' : '#ddd',
      transition: isDragging ? 'none' : 'transform 0.2s ease'
    }"
  >
    <p
      class="flex cursor-move items-center justify-between bg-[var(--bg-color-blue)] p-2 text-[var(--text-color-blank)]"
    >
      <span class="text-drak text-xs">Tools</span>
      <span class="cursor-pointer" @click="handleClose">
        <i class="iconfont icon_windows_close" />
      </span>
    </p>
    <div class="p-2">
      <p class="mb-1 text-xs text-font">Locale</p>
      <p class="grid grid-flow-col items-center justify-start gap-x-2">
        <el-button
          v-for="lang in supportedLanguages"
          :key="lang"
          :type="appStore.language === lang ? 'primary' : ''"
          @click.stop="() => handleToggleLang(lang)"
        >
          <span class="text-[10px]">{{ lang === 'en-US' ? 'English' : '中文' }}</span>
        </el-button>
      </p>
    </div>
    <div class="border-b border-primary" />
    <div class="p-2">
      <p class="mb-1 text-xs text-font">Theme</p>
      <p class="grid grid-flow-col items-center justify-start gap-x-2">
        <el-button
          v-for="item in supportedThemes"
          :key="item"
          :type="theme === item ? 'primary' : ''"
          @click.stop="() => handleToggleTheme(item)"
        >
          <span class="text-[10px]">{{ item }}</span>
        </el-button>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useDraggable, useElementBounding } from '@vueuse/core'
import { useAppStore, SUPPORTED_LANGUAGES, SUPPORTED_THEMES } from '@/renderer/stores'

// 获取应用状态
const appStore = useAppStore()
const { theme } = storeToRefs(appStore)
const { locale } = useI18n()
const target = ref<any>(null)
const visible = ref<boolean>(true)
// 暴露支持的语言和主题
const supportedLanguages = SUPPORTED_LANGUAGES
const supportedThemes = SUPPORTED_THEMES

// 获取拖拽元素的尺寸
const { width, height } = useElementBounding(target)
// 容器尺寸
const containerWidth = ref<number>(400)
const containerHeight = ref<number>(600)
// 拖拽元素的实际尺寸
const elementWidth = ref<number>(0)
const elementHeight = ref<number>(0)

// 判断是否为暗色主题
const isDarkTheme = computed(() => theme.value === 'dark')

const updateElementSize = () => {
  if (target.value) {
    const rect = target.value.getBoundingClientRect()
    elementWidth.value = rect.width
    elementHeight.value = rect.height
  }
}

const { x, y, isDragging } = useDraggable(target, {
  initialValue: { x: 830, y: 20 },
  onMove({ x, y }) {
    if (!target.value) return { x, y }

    // 计算边界限制
    const minX = 0
    const minY = 0
    const maxX = containerWidth.value - width.value
    const maxY = containerHeight.value - height.value

    // 应用边界限制
    const boundedX = Math.max(minX, Math.min(x, maxX))
    const boundedY = Math.max(minY, Math.min(y, maxY))

    return {
      x: boundedX,
      y: boundedY
    }
  }
})

const handleClose = () => {
  visible.value = false
}

const handleToggleLang = (lang: string) => {
  appStore.setLanguage(lang)
  locale.value = lang
}

const handleToggleTheme = (theme: string) => {
  appStore.setTheme(theme)
}

// 组件挂载后和窗口调整时更新尺寸
onMounted(() => {
  updateElementSize()
})

// 监听拖拽状态
watch(isDragging, (newVal) => {
  if (!newVal) {
    updateElementSize()
    // 拖拽结束时确保位置在边界内
    const minX = 0
    const minY = 0
    const maxX = containerWidth.value - elementWidth.value
    const maxY = containerHeight.value - elementHeight.value

    x.value = Math.max(minX, Math.min(x.value, maxX))
    y.value = Math.max(minY, Math.min(y.value, maxY))
  }
})
</script>

<style lang="scss" scoped>
.draggable {
  position: absolute;
  width: 160px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 1px solid #e1e5e9;
  overflow: hidden;
  cursor: move;

  &:active {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }

  &.dragging {
    opacity: 0.9;
    transform: scale(1.02);
  }

  :deep(.el-button) {
    height: unset;
    padding: 6px 10px;
  }

  :deep(.el-button--primary) {
    &:hover {
      --el-button-hover-bg-color: var(--bg-button-black);
      --el-button-hover-border-color: var(--bg-button-black);
    }

    &:active {
      --el-button-active-bg-color: var(--bg-button-black);
      --el-button-active-border-color: var(--bg-button-black);
    }
  }
}
</style>
