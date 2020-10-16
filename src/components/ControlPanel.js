import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTotalPrice } from '../redux/actions/products'

const ControlPanel = () => {
  const [displayState, setDisplayState] = useState({})
  const [totalPrice, setCurrentTotalPrice] = useState(0)
  const productsState = useSelector(({ products }) => products)
  const dispatch = useDispatch()

  useEffect(() => {
    const currentDisplayState = {}
    productsState.products.forEach((category) => {
      currentDisplayState[category.name] = 0
    })

    setDisplayState(currentDisplayState)
  }, [])

  const countTotalPrice = (currentDisplayState) => {
    let total = 0

    Object.keys(currentDisplayState).forEach((key) => {
      total +=
        currentDisplayState[key] *
        productsState.products.find((product) => product.name === key).price
    })

    return parseFloat(total.toFixed(2))
  }

  const plusProduct = (name) => {
    const currentDisplayState = { ...displayState }

    currentDisplayState[name]++

    setCurrentTotalPrice(countTotalPrice(currentDisplayState))
    setDisplayState(currentDisplayState)
  }

  const minusProduct = (name) => {
    const currentDisplayState = { ...displayState }

    currentDisplayState[name]--

    setCurrentTotalPrice(countTotalPrice(currentDisplayState))
    setDisplayState(currentDisplayState)
  }

  return (
    <div className="control-panel">
      <div className="control-panel__display">
        {productsState.totalPrice === 0 ? (
          <ul className="control-panel__display-list">
            {productsState.products.map((category) => (
              <li
                key={`display-${category.id}`}
                className="control-panel__display-item"
              >
                {`${category.name}: ${displayState[category.name]}`}
              </li>
            ))}
          </ul>
        ) : (
          <h2 className="control-panel__display-title">Insert money please</h2>
        )}
        <span className="control-panel__display-total">
          Total:
          {totalPrice}
        </span>
      </div>
      <ul className="control-panel__cetegories">
        {productsState.products.map((category) => (
          <li
            key={`control-panel-${category.id}`}
            className="control-panel__category"
          >
            {category.name}
            <div className="control-panel__category-buttons">
              <button
                disabled={
                  displayState[category.name] === 0 ||
                  productsState.totalPrice !== 0
                }
                onClick={() => minusProduct(category.name)}
                type="button"
                className={`control-panel__category-button control-panel__category-button--${
                  (displayState[category.name] === 0 ||
                    productsState.totalPrice !== 0) &&
                  'disabled'
                }`}
              >
                -
              </button>
              <button
                disabled={
                  displayState[category.name] === category.itemsCount ||
                  productsState.totalPrice !== 0
                }
                onClick={() => plusProduct(category.name)}
                type="button"
                className={`control-panel__category-button control-panel__category-button--${
                  (displayState[category.name] === category.itemsCount ||
                    productsState.totalPrice !== 0) &&
                  'disabled'
                }`}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        disabled={productsState.totalPrice !== 0}
        onClick={() => {
          dispatch(setTotalPrice(totalPrice))
        }}
        type="button"
        className={`control-panel__accept-button control-panel__accept-button--${
          productsState.totalPrice !== 0 && 'disabled'
        }`}
      >
        Accept
      </button>
      <button
        disabled={productsState.totalPrice === 0}
        onClick={() => {
          dispatch(setTotalPrice(0))
        }}
        type="button"
        className={`control-panel__cancel-button control-panel__cancel-button--${
          productsState.totalPrice === 0 && 'disabled'
        }`}
      >
        Cancel
      </button>
    </div>
  )
}

export default ControlPanel
