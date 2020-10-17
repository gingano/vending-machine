import { useEffect } from 'react'
import { countChange } from '../utils/helpers'

const useResult = (
  dispatch,
  productsState,
  setProducts,
  setCurrentChange,
  setModalIsOpened
) => {
  useEffect(() => {
    if (
      productsState.totalPrice !== 0 &&
      productsState.introduced !== 0 &&
      productsState.totalPrice <= productsState.introduced
    ) {
      const processedProducts = productsState.products.map((product) => {
        const currentProduct = { ...product }

        currentProduct.itemsCount -= productsState.totalItems[product.name]

        return currentProduct
      })

      dispatch(setProducts(processedProducts))

      const denominations = [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]

      setCurrentChange(
        countChange(
          denominations,
          productsState.totalPrice,
          productsState.introduced
        )
      )
      setModalIsOpened(true)
    }
  }, [productsState.totalPrice, productsState.introduced])
}

export default useResult
