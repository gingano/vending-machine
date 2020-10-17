export const countChange = (denominations, totalPrice, introduced) => {
  let change = introduced - totalPrice
  change = parseFloat(change.toFixed(2))
  const denominationsCount = {}

  denominations.forEach((denomination) => {
    const integerDivision = Math.floor(change / denomination)
    if (integerDivision > 0) {
      denominationsCount[denomination] = integerDivision
      change = parseFloat((change - denomination * integerDivision).toFixed(2))
    }
  })

  return denominationsCount
}

export const arrayOfItems = (count) => {
  const array = []

  for (let i = 0; i < count; i++) {
    array.push(null)
  }

  return array
}

export const countTotalPrice = (currentDisplayState, productsState) => {
  let total = 0

  Object.keys(currentDisplayState).forEach((key) => {
    total +=
      currentDisplayState[key] *
      productsState.products.find((product) => product.name === key).price
  })

  return parseFloat(total.toFixed(2))
}
