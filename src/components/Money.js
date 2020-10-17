import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIntroduced } from '../redux/actions/products'

const Money = () => {
  const [introducedAccumulator, setIntroducedAccumulator] = useState(0)

  const productsState = useSelector(({ products }) => products)
  const dispatch = useDispatch()

  const insertMoney = (event) => {
    setIntroducedAccumulator(
      introducedAccumulator + Number(event.currentTarget.value)
    )
  }

  useEffect(() => {
    dispatch(setIntroduced(parseFloat(introducedAccumulator.toFixed(2))))
  }, [introducedAccumulator])

  return (
    <div className="money">
      <button
        disabled={
          productsState.totalPrice === 0 ||
          productsState.introduced >= productsState.totalPrice
        }
        onClick={insertMoney}
        value={2}
        type="button"
        className="money__button"
      >
        £2
      </button>
      <button
        disabled={
          productsState.totalPrice === 0 ||
          productsState.introduced >= productsState.totalPrice
        }
        onClick={insertMoney}
        value={1}
        type="button"
        className="money__button"
      >
        £1
      </button>
      <button
        disabled={
          productsState.totalPrice === 0 ||
          productsState.introduced >= productsState.totalPrice
        }
        onClick={insertMoney}
        value={0.5}
        type="button"
        className="money__button  money__button--small"
      >
        50
      </button>
      <button
        disabled={
          productsState.totalPrice === 0 ||
          productsState.introduced >= productsState.totalPrice
        }
        onClick={insertMoney}
        value={0.2}
        type="button"
        className="money__button  money__button--small"
      >
        20
      </button>
      <button
        disabled={
          productsState.totalPrice === 0 ||
          productsState.introduced >= productsState.totalPrice
        }
        onClick={insertMoney}
        value={0.1}
        type="button"
        className="money__button  money__button--small"
      >
        10
      </button>
      <button
        disabled={
          productsState.totalPrice === 0 ||
          productsState.introduced >= productsState.totalPrice
        }
        onClick={insertMoney}
        value={0.05}
        type="button"
        className="money__button  money__button--small"
      >
        5
      </button>
      <button
        disabled={
          productsState.totalPrice === 0 ||
          productsState.introduced >= productsState.totalPrice
        }
        onClick={insertMoney}
        value={0.02}
        type="button"
        className="money__button  money__button--small"
      >
        2
      </button>
      <button
        disabled={
          productsState.totalPrice === 0 ||
          productsState.introduced >= productsState.totalPrice
        }
        onClick={insertMoney}
        value={0.01}
        type="button"
        className="money__button  money__button--small"
      >
        1
      </button>
    </div>
  )
}

export default Money
