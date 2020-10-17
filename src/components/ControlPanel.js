import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTotal } from '../redux/actions/products'
import { countTotalPrice } from '../utils/helpers'
import useDisplayState from '../hooks/useDisplayState'

const ControlPanel = () => {
  const [displayState, setDisplayState] = useState({})
  const [totalPrice, setCurrentTotalPrice] = useState(0)
  const productsState = useSelector(({ products }) => products)
  const dispatch = useDispatch()

  useDisplayState(productsState, setDisplayState)

  const plusProduct = (name) => {
    const currentDisplayState = { ...displayState }

    currentDisplayState[name]++

    setCurrentTotalPrice(countTotalPrice(currentDisplayState, productsState))
    setDisplayState(currentDisplayState)
  }

  const minusProduct = (name) => {
    const currentDisplayState = { ...displayState }

    currentDisplayState[name]--

    setCurrentTotalPrice(countTotalPrice(currentDisplayState, productsState))
    setDisplayState(currentDisplayState)
  }

  const acceptOrder = () => {
    const currentDisplayState = {}
    productsState.products.forEach((category) => {
      currentDisplayState[category.name] = 0
    })

    setCurrentTotalPrice(0)
    setDisplayState(currentDisplayState)
    dispatch(setTotal(displayState, totalPrice))
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
        <p className="control-panel__display-total">
          Total:
          {productsState.totalPrice !== 0
            ? productsState.totalPrice.toFixed(2)
            : totalPrice.toFixed(2)}
        </p>
        {productsState.totalPrice !== 0 && (
          <p className="control-panel__display-total">
            Introduced:
            {productsState.introduced.toFixed(2)}
          </p>
        )}
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
          acceptOrder()
        }}
        type="button"
        className={`control-panel__accept-button control-panel__accept-button--${
          productsState.totalPrice !== 0 && 'disabled'
        }`}
      >
        Accept
      </button>
      <button
        disabled={
          productsState.totalPrice === 0 || productsState.introduced !== 0
        }
        onClick={() => {
          dispatch(setTotal({}, 0))
        }}
        type="button"
        className={`control-panel__cancel-button control-panel__cancel-button--${
          (productsState.totalPrice === 0 || productsState.introduced !== 0) &&
          'disabled'
        }`}
      >
        Cancel
      </button>
    </div>
  )
}

export default ControlPanel
