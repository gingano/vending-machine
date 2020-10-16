const initialState = {
  products: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.value,
      }

    default:
      return state
  }
}
