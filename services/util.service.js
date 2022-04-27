export const utilService = {
    getCurrencySymbol,
}

function getCurrencySymbol(num, currencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(num)
}
