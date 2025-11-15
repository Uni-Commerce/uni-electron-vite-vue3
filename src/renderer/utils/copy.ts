import { ElMessage } from 'element-plus'

let messageInstance: any = null

export const copyAddress = (address: string) => {
  // 如果已有消息实例，先关闭
  if (messageInstance) {
    messageInstance.close()
  }

  messageInstance = ElMessage({
    type: 'success',
    customClass: 'bg-message px-3 py-[13px] border-0 w-[343px] rounded-[8px] el-shadow',
    message: `
      <div class="grid grid-flow-col justify-start items-start gap-x-3">
        <i class="iconfont icon_a-tosttips text-[20px] text-[var(--text-color-green)]"></i>
        <div>
          <p class="font-SFPro-Semi text-base text-primary leading-[22px]">Address copied</p>
          <p class="max-w-[270px] mt-2 text-font text-xs break-all"">${address}</p>
        </div>
      </div>
    `,
    dangerouslyUseHTMLString: true,
    onClose: () => {
      messageInstance.value = null
    }
  })
}
