export const formatAddress = (value: string) => {
  if (value.length > 10) {
    return value.slice(0, 6) + '...' + value.slice(-4)
  }

  return value
}
