<template>
  <div class="h-full overflow-y-auto bg-primary p-4">
    <div class="mx-auto mb-[18px] mt-4 h-[117px] w-[117px]">
      <img
        src="@/popup/assets/images/backup.png"
        alt="Back up your Seed phrase to keep your wallet safe"
      />
    </div>
    <div class="px-4">
      <div class="mb-[26px]">
        <h3 class="mb-2 font-SFPro-Bold text-lg leading-6 text-primary">
          {{ t('backup.wallet') }}
        </h3>
        <p class="text-xs font-normal text-small">
          {{ t('backup.walletMsg') }}
        </p>
      </div>
      <div class="mb-[26px]">
        <h3 class="mb-2 font-SFPro-Bold text-lg leading-6 text-primary">
          {{ t('backup.important') }}
        </h3>
        <p class="text-xs font-normal text-small">
          {{ t('backup.ownership') }}
        </p>
      </div>
      <div class="mb-[26px]">
        <h3 class="mb-2 font-SFPro-Bold text-lg leading-6 text-primary">
          {{ t('backup.securely') }}
        </h3>
        <p class="mb-2 text-xs font-normal text-small">{{ t('backup.use') }}</p>
        <p class="text-xs font-normal text-small">{{ t('backup.keepPhrase') }}</p>
      </div>
    </div>
    <div class="grid grid-flow-row gap-y-4 pt-[51px]">
      <el-button type="primary" @click="handleBackup">
        <span>{{ t('backup.manual') }}</span>
      </el-button>
      <el-button @click="handleLater">
        <span>{{ t('backup.later') }}</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const backupRef = ref<any>(null)
const router = useRouter()

const handleBackup = () => {
  backupRef.value?.open()
}

const handleLater = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
:deep(.el-button) {
  --el-button-text-color: var(--text-color-primary);
  --el-button-bg-color: var(--bg-color-primary);
  --el-font-size-base: 16px;
  --el-button-font-weight: 510;
  --el-border-radius-base: 26px;
  --el-border-color: var(--border-color-primary);
  height: 52px;
  line-height: 22px;
  padding: 15px;
  font-family: var(--font-famili-SFPro-Medium);

  &:hover {
    --el-button-hover-bg-color: var(--bg-color-primary);
    --el-button-hover-border-color: var(--border-color-primary);
  }

  &:active {
    --el-button-active-bg-color: var(--bg-color-primary);
    --el-button-active-border-color: var(--border-color-primary);
    --el-button-active-text-color: var(--bg-color-block);
  }
}

:deep(.el-button--primary) {
  --el-button-text-color: var(--text-color-white);
  --el-button-bg-color: var(--bg-color-block);
  --el-border-color: var(--bg-color-block);

  &:hover {
    --el-button-hover-text-color: var(--text-color-white);
    --el-button-hover-bg-color: var(--bg-color-block);
    --el-button-hover-border-color: var(--bg-color-block);
  }

  &:active {
    --el-button-active-bg-color: var(--bg-color-block);
    --el-button-active-border-color: var(--bg-color-block);
    --el-button-active-text-color: var(--bg-color-primary);
  }
}
</style>
