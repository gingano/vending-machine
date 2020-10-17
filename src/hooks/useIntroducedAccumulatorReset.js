import { useEffect } from 'react'

const useIntroducedAccumulatorReset = (
  productsState,
  setIntroducedAccumulator
) => {
  useEffect(() => {
    if (
      productsState.totalPrice !== 0 &&
      productsState.introduced !== 0 &&
      productsState.totalPrice <= productsState.introduced
    ) {
      setIntroducedAccumulator(0)
    }
  }, [productsState.totalPrice, productsState.introduced])
}

export default useIntroducedAccumulatorReset
