import { useEffect } from 'react'

const useDisplayState = (productsState, setDisplayState) => {
  useEffect(() => {
    const currentDisplayState = {}
    productsState.products.forEach((category) => {
      currentDisplayState[category.name] = 0
    })

    setDisplayState(currentDisplayState)
  }, [])
}

export default useDisplayState
