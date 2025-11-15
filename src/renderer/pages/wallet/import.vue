<template>
  <app-page-view url="/wallet">
    <div class="flex-1">
      <div class="mb-[44px]">
        <h4 class="mb-2 font-SFPro-Bold text-2xl font-bold text-primary">
          {{ t('wallet.seedPhrase') }}
        </h4>
        <p class="text-xs font-normal text-small">{{ t('wallet.seedDescription') }}</p>
      </div>
      <div>
        <p class="mb-[6px] text-sm text-font">{{ t('wallet.seedPlaceholder') }}</p>
        <div class="relative mb-6 min-h-[158px] cursor-pointer rounded-lg bg-body">
          <app-editable-textarea ref="editableRef" @blur="handleBlur" />
        </div>
        <div class="flex justify-center">
          <el-button
            class="h-[36px] w-[95px] rounded-[18px] border-0 bg-gray font-SFPro-Medium text-primary"
            @click="handleClipboard"
          >
            <i class="iconfont icon_paste mr-[6px]" />
            <span>{{ t('global.paste') }}</span>
          </el-button>
        </div>
      </div>
    </div>
    <div class="grid grid-flow-row">
      <el-button type="primary" :disabled="disabled" @click="handleSubmit">
        <span>{{ t('global.import') }}</span>
      </el-button>
    </div>
  </app-page-view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore, useSeedPhrase } from '@/renderer/stores'

defineEmits(['close'])
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const { activeWallet, hasWallet } = storeToRefs(userStore)
const { saveSeedPhrases, handleSetBackup } = useSeedPhrase()
const walletRef = ref<any>(null)
const passwordRef = ref<any>(null)
const editableRef = ref<any>(null)
const disabled = ref<boolean>(true)

const isNumericString = (str: string) => {
  return /^-?\d+(\.\d+)?$/.test(str)
}

const handleClipboard = async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      const content = await navigator.clipboard.readText()
      if (content) {
        if (isNumericString(content)) {
          editableRef.value.setText('')
          disabled.value = true
          editableRef.value?.focus()
          return
        }

        let word: string = content
        if (word.startsWith('0x')) {
          word = word.replace('0x', '')
          if (word.length === 64) {
            word = word.substring(0, 62)
          }
        }
        editableRef.value.setText(content)
        disabled.value = false
      }
    } else {
      ElMessage.warning(t('validate.clipboard'))
    }
  } catch (err) {
    console.error(err)
    ElMessage.warning(t('validate.clipboardMsg'))
  }
}

const handleBlur = (value: string) => {
  disabled.value = !value
}

const handleCheck = (value: string) => {
  const validLength = [12, 15, 18, 21, 24]
  const codes: string[] = value.split(' ')
  return validLength.includes(codes.length)
}

const removeDotAndLeftOneDigit = (str: string) => {
  // 匹配 "一位数字+" 后跟 "." 的模式
  return str.replace(/\d\./g, '')
}

const handleSubmit = async () => {
  const text: string = editableRef.value?.getText()
  const value: string = removeDotAndLeftOneDigit(text)

  if (/\s/.test(value)) {
    const check: boolean = handleCheck(value)

    if (!check) {
      const messageText: string = t('backup.incorrect')
      const iconClass: string = 'icon_error_message text-[var(--text-color-red)]'
      ElMessageBox({
        title: '',
        customClass: 'max-w-[148px] px-[18px] py-[20px] text-center bg-message',
        message: `
          <p class="grid grid-flow-row gap-y-[10px]">
            <span class="block w-[48px] h-[48px] mx-auto mb-[5px]">
              <i class="iconfont ${iconClass} text-[48px]"></i>
            </span>
            <span class="font-SFPro-Medium text-xs text-primary">${messageText}</span>
          </p>
        `,
        showClose: false,
        showCancelButton: false,
        showConfirmButton: false,
        dangerouslyUseHTMLString: true
      }).catch(() => {})
      // 2s自动关闭
      setTimeout(() => {
        ElMessageBox.close()
      }, 2000)
    } else {
      const codes: string[] = value.split(' ')
      saveSeedPhrases([...codes])
      if (hasWallet.value) {
        passwordRef.value?.open()
      } else {
        walletRef.value?.open()
      }
    }
  } else {
    if (hasWallet.value) {
      passwordRef.value?.open()
    } else {
      walletRef.value?.open()
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleConfirm = (password: string) => {
  if (password !== activeWallet.value?.password) {
    const messageText: string = t('global.passwordNotMatch')
    const iconClass: string = 'icon_error_message text-[var(--text-color-red)]'
    ElMessageBox({
      title: '',
      customClass: 'max-w-[148px] px-[18px] py-[20px] text-center bg-message',
      message: `
              <p class="grid grid-flow-row gap-y-[10px]">
                <span class="block w-[48px] h-[48px] mx-auto mb-[5px]">
                  <i class="iconfont ${iconClass} text-[48px]"></i>
                </span>
                <span class="font-SFPro-Medium text-xs text-primary">${messageText}</span>
              </p>
            `,
      showClose: false,
      showCancelButton: false,
      showConfirmButton: false,
      dangerouslyUseHTMLString: true
    }).catch(() => {})
    // 2s自动关闭
    setTimeout(() => {
      ElMessageBox.close()
    }, 2000)
  } else {
    handleSetBackup(true)
    passwordRef.value?.close()
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-button--primary) {
  --el-button-bg-color: var(--bg-color-block);
  --el-border-color: var(--bg-color-block);
  --el-button-text-color: var(--text-color-white);
  --el-font-size-base: 16px;
  --el-button-font-weight: 510;
  --el-border-radius-base: 26px;
  height: 52px;
  line-height: 22px;
  padding: 15px;
  font-family: var(--font-famili-SFPro-Medium);

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

  &.is-disabled {
    --el-button-disabled-text-color: var(--text-color-white);
    --el-button-disabled-bg-color: var(--bg-color-block);
    --el-button-disabled-border-color: var(--bg-color-primary);
  }
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-form-item__label) {
  --el-text-color-regular: var(--text-color-font);
}
</style>
