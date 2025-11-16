<template>
  <div class="grid h-full grid-cols-[155px_1fr] items-stretch justify-between">
    <div class="bg-input p-2 pt-[67px]">
      <div class="flex h-full flex-col justify-between">
        <div class="grid grid-flow-row gap-y-[10px]">
          <div
            class="grid grid-flow-col items-center justify-start gap-x-[5px] rounded-[6px] p-[7px]"
          >
            <app-wallet-icon />
            <router-link to="/wallet">
              <span class="text-sm text-font">{{ t('menu.wallet') }}</span>
            </router-link>
          </div>
          <div
            class="grid grid-flow-col items-center justify-start gap-x-[5px] rounded-[6px] p-[7px]"
          >
            <app-wallet-icon />
            <router-link to="/home">
              <span class="text-sm text-font">{{ t('menu.dashboard') }}</span>
            </router-link>
          </div>
          <div
            class="grid grid-flow-col items-center justify-start gap-x-[5px] rounded-[6px] p-[7px]"
          >
            <app-swap-icon />
            <router-link to="/swap">
              <span class="text-sm text-font">{{ t('menu.swap') }}</span>
            </router-link>
          </div>
          <div
            class="grid grid-flow-col items-center justify-start gap-x-[5px] rounded-[6px] p-[7px]"
          >
            <app-history-icon />
            <router-link to="/history">
              <span class="text-sm text-font">{{ t('menu.history') }}</span>
            </router-link>
          </div>
        </div>
        <div class="grid grid-flow-row gap-y-[10px]">
          <div
            class="relative grid grid-flow-col items-center justify-start gap-x-[5px] rounded-[6px] p-[7px]"
          >
            <app-lock-icon />
            <span class="text-sm text-font">{{ t('menu.lock') }}</span>
            <el-switch v-model="locked" class="absolute right-0 z-10" />
          </div>
          <div
            class="grid grid-flow-col items-center justify-start gap-x-[5px] rounded-[6px] p-[7px]"
          >
            <app-setting-icon />
            <router-link to="/mine">
              <span class="text-sm text-font">{{ t('menu.setting') }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div class="px-4 pb-[28px]">
          <div
            class="grid cursor-pointer grid-flow-col items-center justify-start"
            @click="handleToggleAccount"
          >
            <img src="@/renderer/assets/images/avatar.png" class="h-6 w-6 rounded" />
            <div>
              <p>
                <span class="ml-[10px] font-SFPro-Medium text-base leading-[22px] text-primary">
                  {{ activeWallet?.name }}
                </span>
                <i class="iconfont icon_arrow_drop_down ml-[5px] text-[20px]" />
              </p>
              <p class="mb-[5px] font-DIN-Bold text-[28px] font-bold text-primary">
                {{ `$${String(walletData.balance).padEnd(4, '.00')}` }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <router-view v-slot="{ Component, route: routeInfo }">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="routeInfo.path" v-bind="$route.query" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore, useSeedPhrase } from '@/renderer/stores'

const { t } = useI18n()
const userStore = useUserStore()
const seedPhrase = useSeedPhrase()
const { handleSetWallet } = userStore
const { activeWallet } = storeToRefs(userStore)
const { hasBackup } = storeToRefs(seedPhrase)
const cachedViews = ref([])
const locked = ref<boolean>(false)
const walletData = ref<any>(
  hasBackup
    ? {
        balance: 600.62,
        total: '+$20.07'
      }
    : {
        balance: 0,
        total: '0'
      }
)

const handleToggleAccount = () => {
  handleSetWallet({
    name: 'HALISI - Q02',
    password: '12345Abc',
    address: '0xf55369dac5bc98329aa4caafbf746c933733b90a',
    isActive: true
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-switch__core) {
  height: 15px;
  min-width: 28px;
}

:deep(.el-switch__action) {
  width: 13px;
  height: 13px;
}

:deep(.el-switch) {
  &.is-checked {
    .el-switch__core {
      .el-switch__action {
        left: calc(100% - 13px);
      }
    }
  }
}
</style>
