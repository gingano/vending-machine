import { useEffect } from 'react'

const useIntroducedAccumulator = (
  dispatch,
  introducedAccumulator,
  setIntroduced
) => {
  useEffect(() => {
    dispatch(setIntroduced(parseFloat(introducedAccumulator.toFixed(2))))
  }, [introducedAccumulator])
}

export default useIntroducedAccumulator
