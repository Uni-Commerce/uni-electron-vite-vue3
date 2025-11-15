/**
 * 地址校验函数
 * @param {string} address - 要校验的地址
 * @returns {boolean} - 是否为有效的十六进制地址
 */
export const validateAddress = (address: string): boolean => {
  if (typeof address !== 'string') {
    return false
  }

  // 十六进制正则：数字 + 大小写字母 A-F
  const hexRegex = /^[0-9a-fA-F]+$/
  return hexRegex.test(address)
}
