export const setProducts = (value) => ({
  type: 'SET_PRODUCTS',
  value,
})

export const setTotal = (items, price) => ({
  type: 'SET_TOTAL',
  items,
  price,
})

export const setIntroduced = (value) => ({
  type: 'SET_INTRODUCED',
  value,
})

export const resetProducts = () => ({
  type: 'RESET_PRODUCTS',
})
