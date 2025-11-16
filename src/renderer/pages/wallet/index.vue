<template>
  <div class="mx-auto mt-[52px] w-[700px]">
    <div
      class="grid cursor-pointer grid-flow-col items-center justify-center gap-x-[15px]"
      @click="handleToHome"
    >
      <div class="h-8 w-8 rounded">
        <img src="@/renderer/assets/images/logo.png" :alt="t('wallet.appName')" />
      </div>
      <h3 class="font-SFPro-Bold text-xl leading-[26px] text-primary">{{ t('wallet.appName') }}</h3>
    </div>
    <div class="mb-8 mt-[85px]">
      <h1 class="mb-[6px] font-SFPro-Bold text-2xl text-primary">{{ t('wallet.welcome') }}</h1>
      <p class="text-xs text-font">{{ t('waller.message') }}</p>
    </div>
    <div class="grid grid-cols-2 items-center justify-center gap-x-[48px]">
      <div
        class="flex h-[335px] cursor-pointer items-center justify-center rounded-2xl bg-block"
        @click="handleToCreate"
      >
        <div class="text-center">
          <span class="inline-block">
            <i class="iconfont icon_wallet text-[68px] text-white" />
          </span>
          <h5 class="font-SFPro-Bold text-xl leading-[26px] text-white">
            <span>{{ t('wallet.create') }}</span>
          </h5>
          <p class="mt-2 text-sm text-block">{{ t('wallet.createMsg') }}</p>
        </div>
      </div>
      <div
        class="flex h-[335px] cursor-pointer items-center justify-center rounded-2xl bg-primary"
        @click="handleToImport"
      >
        <div class="text-center">
          <span class="inline-block">
            <i class="iconfont icon_a-ImportWallet text-[68px] text-primary" />
          </span>
          <h5 class="font-SFPro-Bold text-xl leading-[26px] text-primary">
            <span>{{ t('wallet.import') }}</span>
          </h5>
          <p class="mt-2 text-sm text-font">{{ t('wallet.importMsg') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const handleToHome = () => {
  router.push('/')
}

const handleToCreate = () => {
  router.push('/wallet/create')
}

const handleToImport = () => {
  router.push('/wallet/import')
}
</script>
