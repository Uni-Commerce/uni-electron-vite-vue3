<template>
  <div class="flex items-center gap-2">
    <span class="font-SFPro-Medium text-xs" :style="{ color: textColor }">{{ strengthText }}</span>
    <span class="flex flex-col-reverse gap-0.5">
      <span
        v-for="(bar, index) in bars"
        :key="index"
        class="h-[3px] w-[14px] rounded"
        :style="{ backgroundColor: bar.color }"
      />
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  password: {
    type: String,
    default: '',
    validator: () => {
      return true // 始终返回 true 以避免阻止渲染
    }
  }
})

const { t } = useI18n()
// 响应式状态
const strengthText = ref('')
const textColor = ref('var(--password-button-color)')
const bars = ref([
  { color: 'var(--password-button-color)' },
  { color: 'var(--password-button-color)' },
  { color: 'var(--password-button-color)' },
  { color: 'var(--password-button-color)' }
])

// 密码强度判断逻辑
const checkPasswordStrength = (password: string) => {
  if (!password) {
    strengthText.value = ''
    textColor.value = 'var(--password-button-color)'
    bars.value = [
      { color: 'var(--password-button-color)' },
      { color: 'var(--password-button-color)' },
      { color: 'var(--password-button-color)' },
      { color: 'var(--password-button-color)' }
    ]
    return
  }

  // 使用 Array.from 处理可能的 Unicode 或特殊字符
  let correctedPassword = password
  let chars = Array.from(correctedPassword)
  let length = chars.length

  const hasLetters = /[a-zA-Z]/.test(correctedPassword)
  const hasDigits = /\d/.test(correctedPassword)
  // eslint-disable-next-line no-useless-escape
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(correctedPassword)
  const charTypes = [hasLetters, hasDigits, hasSymbols].filter(Boolean).length
  const hasUppercase = /[A-Z]/.test(correctedPassword)
  const hasLowercase = /[a-z]/.test(correctedPassword)
  const hasRepeated = /(.)\1{2,}/.test(correctedPassword)
  const hasSequence =
    /(012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|zyx|yxw|xwv|wvu|vus|tsr|srq|rqp|qpo|pon|onm|nml|mlk|lkj|kji|jih|ihg|hgf|gfe|fed|edc|dcb|cba)/i.test(
      correctedPassword
    )
  const hasCommonWord = /\b(password|admin|user|root|test|guest|123456|qwerty)\b/i.test(
    correctedPassword
  )
  const uniqueSymbols = new Set(
    // eslint-disable-next-line no-useless-escape
    correctedPassword.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []
  ).size

  // 很好：优先检查
  if (
    length >= 18 &&
    length <= 20 &&
    charTypes >= 3 &&
    hasUppercase &&
    hasLowercase &&
    uniqueSymbols >= 2 &&
    !hasRepeated &&
    !hasSequence &&
    !hasCommonWord
  ) {
    strengthText.value = t('validate.password.veryStrong')
    textColor.value = 'var(--password-very-strong-color)'
    bars.value = [
      { color: 'var(--password-very-strong-color)' },
      { color: 'var(--password-very-strong-color)' },
      { color: 'var(--password-very-strong-color)' },
      { color: 'var(--password-very-strong-color)' }
    ]
    return
  }

  // 强
  if (
    length >= 16 &&
    length <= 20 &&
    charTypes >= 3 &&
    !hasRepeated &&
    !hasSequence &&
    !hasCommonWord
  ) {
    strengthText.value = t('validate.password.strong')
    textColor.value = 'var(--password-strong-color)'
    bars.value = [
      { color: 'var(--password-strong-color)' },
      { color: 'var(--password-strong-color)' },
      { color: 'var(--password-strong-color)' },
      { color: 'var(--password-button-color)' }
    ]
    return
  }

  // 一般
  if (
    length >= 8 &&
    length <= 15 &&
    charTypes >= 2 &&
    !hasRepeated &&
    !hasSequence &&
    !hasCommonWord
  ) {
    strengthText.value = t('validate.password.fair')
    textColor.value = 'var(--password-fair-color)'
    bars.value = [
      { color: 'var(--password-fair-color)' },
      { color: 'var(--password-fair-color)' },
      { color: 'var(--password-button-color)' },
      { color: 'var(--password-button-color)' }
    ]
    return
  }

  // 弱
  if (length < 8 || charTypes === 1 || hasRepeated || hasSequence || hasCommonWord) {
    strengthText.value = t('validate.password.weak')
    textColor.value = 'var(--password-weak-color)'
    bars.value = [
      { color: 'var(--password-weak-color)' },
      { color: 'var(--password-button-color)' },
      { color: 'var(--password-button-color)' },
      { color: 'var(--password-button-color)' }
    ]
    return
  }

  // 默认情况
  strengthText.value = t('validate.password.weak')
  textColor.value = 'var(--password-weak-color)'
  bars.value = [
    { color: 'var(--password-weak-color)' },
    { color: 'var(--password-button-color)' },
    { color: 'var(--password-button-color)' },
    { color: 'var(--password-button-color)' }
  ]
}

// 监听密码变化
watch(
  () => props.password,
  (newVal) => {
    checkPasswordStrength(newVal)
  },
  {
    immediate: true
  }
)
</script>
