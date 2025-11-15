<template>
  <div
    ref="editableRef"
    class="relative min-h-[158px] p-3 font-SFPro-Medium text-sm font-medium text-primary outline-none"
    contenteditable="true"
    @input="handleInput"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
    @focus="handleFocus"
    @blur="handleBlur"
    @paste="handlePaste"
  >
    <span
      v-if="showPlaceholder"
      class="pointer-events-none absolute left-3 top-3 select-none text-sm text-font"
    >
      {{ t('global.enter') }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'

const emits = defineEmits(['blur'])
const { t } = useI18n()
const editableRef = ref<any>(null)
const showPlaceholder = ref<boolean>(true)
const counter = ref<number>(0)
const isInitialized = ref<boolean>(false)
const isComposing = ref<boolean>(false)
const isPrivateKey = ref<boolean>(false)

/**
 * ✅ 新增：重新计算编号函数
 * - 每当用户删除中间内容或输入时调用
 * - 扫描 DOM 中所有 .text-code 并重新编号
 */
const recalculateCounter = () => {
  const el = editableRef.value
  if (!el) return

  // 保存当前选区节点引用（更可靠）
  const sel = window.getSelection()
  const focusNode = sel?.focusNode
  const focusOffset = sel?.focusOffset ?? 0

  const spans = Array.from(el.querySelectorAll('.text-code')) as HTMLElement[]
  if (spans.length === 0) {
    counter.value = 0
    isInitialized.value = false
    return
  }

  spans.forEach((span: any, index) => {
    // ✅ 只修改显示数字部分
    const num = `${index + 1}.`
    if (span.firstChild?.nodeValue !== num) {
      span.firstChild.nodeValue = num
    }

    // ✅ 样式一致性
    span.classList.toggle('ml-[10px]', index > 0)

    // ✅ 确保编号节点后紧跟一个可写空格节点，否则光标卡死
    const next = span.nextSibling
    if (!next || next.nodeType !== 3) {
      span.insertAdjacentText('afterend', '\u00A0') // &nbsp;
    }
  })

  counter.value = spans.length
  isInitialized.value = true

  // ✅ 恢复选区
  if (focusNode && el.contains(focusNode)) {
    try {
      const range = document.createRange()
      range.setStart(focusNode, Math.min(focusOffset, focusNode.textContent?.length ?? 0))
      range.collapse(true)
      sel?.removeAllRanges()
      sel?.addRange(range)
    } catch (err) {
      console.warn('selection restore failed', err)
    }
  }
}

/**
 * 每次输入后更新 placeholder，并重新计算编号
 */
const handleInput = () => {
  const el = editableRef.value
  if (!el) return
  const text = el.innerText.trim()
  showPlaceholder.value = text === ''

  // ✅ 输入后重新计算编号，保持同步
  if (!isPrivateKey.value) recalculateCounter()
}

const handleKeyup = () => {
  const el = editableRef.value
  if (el.innerText.trim() === '') {
    isPrivateKey.value = false
  }
}

/**
 * Keydown 控制逻辑：初始化编号、自动编号、删除重算、智能插入
 */
const handleKeydown = (e: KeyboardEvent) => {
  const el = editableRef.value
  if (!el || isPrivateKey.value || isComposing.value) return

  // 🟢 首次输入字符 -> 初始化编号
  if (
    !isInitialized.value &&
    e.key.length === 1 &&
    e.key !== ' ' &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  ) {
    counter.value = 1
    el.innerHTML = `<span class="text-code" contenteditable="true">${counter.value}.&nbsp;</span>\u00A0${e.key}`
    moveCaretToEnd(el)
    isInitialized.value = true
    e.preventDefault()
    return
  }

  // 🟢 空格自动编号（支持末尾和中间插入）
  if (e.key === ' ' && !e.ctrlKey && !e.metaKey && !e.altKey && isInitialized.value) {
    e.preventDefault()

    // 🧠 使用微任务延迟，让浏览器先完成 selection 的内部状态更新
    Promise.resolve().then(() => {
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0) return
      const range = sel.getRangeAt(0)

      // 光标若在编号内，移出 span
      const spans: any = Array.from(el.querySelectorAll('.text-code'))
      for (const span of spans) {
        if (span.contains(sel.anchorNode)) {
          range.setStartAfter(span)
          range.setEndAfter(span)
          sel.removeAllRanges()
          sel.addRange(range)
          break
        }
      }

      // 根据光标位置判断插入编号序号
      let insertAfterIndex = 0
      const allSpans = Array.from(el.querySelectorAll('.text-code'))
      for (let i = 0; i < allSpans.length; i++) {
        const s: any = allSpans[i]
        const r = document.createRange()
        r.selectNodeContents(s)
        if (range.compareBoundaryPoints(Range.START_TO_END, r) > 0) insertAfterIndex = i + 1
      }

      const newIndex = insertAfterIndex + 1

      // ✅ 借助 insertTextAtCaret 插入编号加空格
      insertTextAtCaret(
        `<span class="ml-[10px] text-code" contenteditable="true">${newIndex}.&nbsp;</span>&nbsp;`
      )

      // 下一帧重排编号顺序
      requestAnimationFrame(() => recalculateCounter())
    })
    return
  }

  // 🟢 删除键智能重排
  // if (e.key === 'Backspace') {
  //   requestAnimationFrame(() => recalculateCounter())
  // }
  if (e.key === 'Backspace') {
    requestAnimationFrame(() => {
      recalculateCounter()

      // ✳️ 如果删除后光标在编号节点后方卡死，修复空白
      const sel = window.getSelection()
      const node = sel?.focusNode
      if (node && node.nodeType === 1 && (node as HTMLElement).classList?.contains('text-code')) {
        const elNode = node as HTMLElement
        elNode.insertAdjacentText('afterend', '\u00A0')
        moveCaretToEnd(elNode.nextSibling as Node)
      }
    })
  }
}

/**
 * 把光标移到内容末尾
 */
const moveCaretToEnd = (node?: Node) => {
  const range = document.createRange()
  const sel = window.getSelection()

  if (node && node.nodeType === 3) {
    range.setStart(node, node.textContent?.length ?? 0)
  } else if (node && node.nodeType === 1) {
    range.selectNodeContents(node)
  } else if (editableRef.value) {
    range.selectNodeContents(editableRef.value)
  }

  range.collapse(false)
  sel?.removeAllRanges()
  sel?.addRange(range)
}

/**
 * 在光标处插入 HTML
 */
const insertTextAtCaret = (html: string) => {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return

  const range = sel.getRangeAt(0)
  range.collapse(true)

  // 🚀 使用占位符避免 span 嵌套问题
  const tempNode = document.createTextNode('\u200B') // 零宽空格
  range.insertNode(tempNode)

  const newRange = document.createRange()
  newRange.setStartAfter(tempNode)
  newRange.setEndAfter(tempNode)
  sel.removeAllRanges()
  sel.addRange(newRange)

  tempNode.remove()

  // 插入 span 编号 + 空格
  const frag = range.createContextualFragment(html + '\u00A0') // &nbsp;
  const lastNode = frag.lastChild
  range.insertNode(frag)

  const afterRange = document.createRange()
  if (lastNode) {
    afterRange.setStartAfter(lastNode)
    afterRange.setEndAfter(lastNode)
  }
  sel.removeAllRanges()
  sel.addRange(afterRange)
}

/**
 * 聚焦与失焦处理
 */
const handleFocus = () => (showPlaceholder.value = false)

const handleBlur = () => {
  const el = editableRef.value
  if (!el) return
  if (el.innerText.trim() === '') {
    showPlaceholder.value = true
    counter.value = 0
    isInitialized.value = false
    isPrivateKey.value = false
  }
  emits('blur', el.innerText.trim())
}

/**
 * 导出方法：获取 & 设置文本内容
 */
const handleGetText = () => {
  const el = editableRef.value
  return el.innerText.trim()
}

const handleSetText = (value: string) => {
  const el = editableRef.value

  if (/\s/.test(value)) {
    isPrivateKey.value = false
    const words: string[] = value.split(/\s+/)
    let html: string = ''
    words.forEach((word, index: number) => {
      html += `<span class="text-code ${index > 0 ? 'ml-[10px]' : ''}" contenteditable="true">${index + 1}.&nbsp;</span>&nbsp;${word}`
    })
    el.innerHTML = html
    // ✅ 同步计数器和状态
    recalculateCounter()
  } else {
    isPrivateKey.value = true
    el.innerText = value
  }
}

const isNumericString = (str: string) => {
  return /^-?\d+(\.\d+)?$/.test(str)
}

// test1 test2 test3 test4
const handlePaste = async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      const content = await navigator.clipboard.readText()

      if (content) {
        if (isNumericString(content)) {
          handleSetText('')
          return
        }

        let word: string = content
        if (word.startsWith('0x')) {
          word = word.replace('0x', '')
          if (word.length === 64) {
            word = word.substring(0, 62)
          }
        }
        handleSetText(content)
      }
    } else {
      ElMessage.warning(t('validate.clipboard'))
    }
  } catch (err) {
    console.error(err)
    ElMessage.warning(t('validate.clipboardMsg'))
  }
}

const handleToFocus = () => {
  editableRef.value?.focus()
}

defineExpose({
  getText: handleGetText,
  setText: handleSetText,
  focus: handleToFocus
})
</script>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  --el-input-bg-color: transparent;
  --el-input-text-color: var(--text-color-primary);
  --el-input-border-radius: 8px;
  position: absolute;
  box-shadow: unset;
  resize: none;
  height: 100%;
}
</style>
