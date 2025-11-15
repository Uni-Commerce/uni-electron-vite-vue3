export const formatNumber = (value: number) => {
  // 将数字转换为字符串并分割整数和小数部分
  const parts = value.toString().split('.')
  // 处理整数部分，添加千位分隔符
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // 重新组合整数和小数部分
  return parts.join('.')
}

export const formatString = (value: string) => {
  // 将数字转换为字符串并分割整数和小数部分
  const parts = value.split('.')
  // 处理整数部分，添加千位分隔符
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // 重新组合整数和小数部分
  return parts.join('.')
}
