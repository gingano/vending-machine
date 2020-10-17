import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIntroduced } from '../redux/actions/products'
import useIntroducedAccumulator from '../hooks/useIntroducedAccumulator'

const Money = () => {
  const denominations = [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01]
  const [introducedAccumulator, setIntroducedAccumulator] = useState(0)

  const productsState = useSelector(({ products }) => products)
  const dispatch = useDispatch()

  const insertMoney = (event) => {
    setIntroducedAccumulator(
      introducedAccumulator + Number(event.currentTarget.value)
    )
  }

  useIntroducedAccumulator(dispatch, introducedAccumulator, setIntroduced)

  return (
    <div className="money">
      {denominations.map((denomination) => (
        <button
          key={`money-${denomination}`}
          disabled={
            productsState.totalPrice === 0 ||
            productsState.introduced >= productsState.totalPrice
          }
          onClick={insertMoney}
          value={denomination}
          type="button"
          className={`money__button  money__button--${
            denomination < 1 && 'small'
          }`}
        >
          {`${denomination >= 1 ? '£' : ''}${
            denomination >= 1 ? denomination : denomination * 100
          }`}
        </button>
      ))}
    </div>
  )
}

export default Money
