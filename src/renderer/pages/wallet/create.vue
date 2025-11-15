<template>
  <app-page-view url="/wallet">
    <div class="flex-1">
      <div class="mb-[38px]">
        <h4 class="mb-2 font-SFPro-Bold text-2xl font-bold text-primary">
          {{ t('wallet.create') }}
        </h4>
        <p class="text-xs font-normal text-small">{{ t('wallet.createDescription') }}</p>
      </div>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        hide-required-asterisk
        @submit.prevent="handleSubmit"
      >
        <p class="mb-[6px] text-sm text-font">{{ t('wallet.name') }}</p>
        <div class="mb-4 rounded-lg bg-body">
          <el-form-item label="" prop="name">
            <el-input v-model="form.name" :placeholder="t('global.placeholder')" />
          </el-form-item>
        </div>
        <div class="mb-4 rounded-lg bg-body">
          <el-form-item label="" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              :placeholder="t('global.passwordHolder')"
            >
              <template #suffix>
                <app-base-password-display :password="form.password" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="borderd" label="" prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              :type="visbile ? 'password' : 'text'"
              :placeholder="t('global.repeatHolder')"
            >
              <template #suffix>
                <i
                  :class="[
                    'iconfont cursor-pointer text-xl',
                    visbile ? 'icon_visibility1' : 'icon_visibilityed'
                  ]"
                  @click="handleToggle"
                />
              </template>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div>
      <el-checkbox v-model="form.agree">
        <span class="text-mini text-font">{{ t('wallet.agree') }}</span>
        <span class="text-mini text-primary">
          <span>《{{ t('wallet.terms') }}》</span>
        </span>
      </el-checkbox>
      <div class="mt-4 grid grid-flow-col">
        <el-button type="primary" @click="handleSubmit(formRef)">
          <span>{{ t('global.create') }}</span>
        </el-button>
      </div>
    </div>
  </app-page-view>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/renderer/stores'

const emits = defineEmits(['close'])
const { t } = useI18n()
const router = useRouter()
const { handleSetWallet } = useUserStore()
const formRef = ref<any>(null)
const visbile = ref<boolean>(true)
const form = reactive({
  name: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const validateConfirmPassword = (_: any, value: string, callback: any) => {
  if (!value) callback()
  if (value !== form.password) {
    callback(new Error(t('validate.repeatPassword')))
  } else {
    callback()
  }
}

const rules = reactive({
  name: [{ required: true, trigger: 'blur', message: t('validate.required') }],
  password: [
    { required: true, trigger: 'change', message: '' },
    {
      min: 8,
      max: 20,
      trigger: 'change',
      message: ''
    }
  ],
  confirmPassword: [
    { required: true, trigger: 'change', message: t('validate.required') },
    {
      min: 8,
      max: 20,
      trigger: 'change',
      message: t('validate.password')
    },
    { trigger: 'change', validator: validateConfirmPassword }
  ],
  agree: [{ required: true, trigger: 'blur', message: t('validate.confirm') }]
})

const handleToggle = () => {
  visbile.value = !visbile.value
}

const handleSubmit = async (formEl: any) => {
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      if (!form.agree) {
        ElMessage.warning(t('validate.confirmMsg'))
      } else {
        handleSetWallet({
          name: form.name,
          password: form.password,
          address: '',
          isActive: true
        })
        emits('close')
        router.push('/backup')
      }
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-button--primary) {
  --el-button-text-color: var(--text-color-white);
  --el-button-bg-color: var(--bg-color-block);
  --el-border-color: var(--bg-color-block);
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
    --el-button-disabled-bg-color: var(--bg-color-block);
    --el-button-disabled-border-color: var(--bg-color-primary);
  }
}

:deep(.el-checkbox__label) {
  font-size: var(--font-size-mini);
}

:deep(.el-form-item__label) {
  --el-text-color-regular: var(--text-color-font);
}

:deep(.el-input__wrapper) {
  margin: 0 11px;
  padding-right: 0;
  padding-left: 0;
  background-color: transparent;
  border-radius: unset;
  box-shadow: unset !important;
  border-width: 0;
}

:deep(.el-input) {
  --el-input-height: 52px;
  --el-text-color-regular: var(--text-color-font);
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-checkbox__inner) {
  --el-checkbox-input-width: 12px;
  --el-checkbox-input-height: 12px;
  --el-checkbox-bg-color: var(--bg-color-page);
  border-radius: 50%;
  border-color: var(--border-color-outline);
}

.borderd {
  :deep(.el-input__wrapper) {
    border-top: 1px solid var(--border-color-primary);
  }
}
</style>
