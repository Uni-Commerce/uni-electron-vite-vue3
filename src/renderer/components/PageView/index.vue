<template>
  <div class="grid h-full grid-flow-col items-start justify-start gap-x-[133px] p-[66px]">
    <p
      class="grid cursor-pointer grid-flow-col items-center justify-start gap-x-1"
      @click="handleToBack"
    >
      <i class="iconfont icon_back text-[22px] text-primary" />
      <span class="text-xs text-primary">{{ t('gloabl.back') }}</span>
    </p>
    <div class="flex h-full w-[518px] flex-col">
      <slot name="default" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    url?: string
  }>(),
  {
    url: '/'
  }
)
const { url } = props
const { t } = useI18n()
const router = useRouter()

const handleToBack = () => {
  router.push(url)
}
</script>
