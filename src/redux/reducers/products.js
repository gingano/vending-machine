const initialState = {
  products: [
    {
      id: 1,
      name: 'snacks1',
      imageName: 'snack1.png',
      itemsCount: 4,
      price: 1.1,
    },
    {
      id: 2,
      name: 'snacks2',
      imageName: 'snack2.png',
      itemsCount: 4,
      price: 1.3,
    },
    {
      id: 3,
      name: 'snacks3',
      imageName: 'snack3.png',
      itemsCount: 4,
      price: 1.44,
    },
    {
      id: 4,
      name: 'snacks4',
      imageName: 'snack4.png',
      itemsCount: 4,
      price: 2,
    },
    {
      id: 5,
      name: 'snacks5',
      imageName: 'snack5.png',
      itemsCount: 4,
      price: 2.5,
    },
  ],
  totalItems: {},
  totalPrice: 0,
  introduced: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.value,
      }

    case 'SET_TOTAL':
      return {
        ...state,
        totalPrice: action.price,
        totalItems: action.items,
      }

    case 'SET_INTRODUCED':
      return {
        ...state,
        introduced: action.value,
      }

    case 'RESET_PRODUCTS':
      return {
        ...state,
        products: [...initialState.products],
      }

    case 'RESET_HELPERS':
      return {
        ...state,
        totalItems: { ...initialState.totalItems },
        totalPrice: initialState.totalPrice,
        introduced: initialState.introduced,
      }

    default:
      return state
  }
}
