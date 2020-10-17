import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTotal, resetProducts } from '../redux/actions/products'
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
          {`Total: 
          ${
            productsState.totalPrice !== 0
              ? productsState.totalPrice.toFixed(2)
              : totalPrice.toFixed(2)
          }`}
        </p>
        {productsState.totalPrice !== 0 && (
          <p className="control-panel__display-total">
            {`Introduced: 
            ${productsState.introduced.toFixed(2)}`}
          </p>
        )}
      </div>
      <div className="control-panel-controls">
        <ul className="control-panel__categories">
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
                  className="control-panel__category-button"
                >
                  <span className="control-panel__button-text">-</span>
                </button>
                <button
                  disabled={
                    displayState[category.name] === category.itemsCount ||
                    productsState.totalPrice !== 0
                  }
                  onClick={() => plusProduct(category.name)}
                  type="button"
                  className="control-panel__category-button"
                >
                  <span className="control-panel__button-text">+</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="control-panel__control-buttons">
          <button
            disabled={productsState.totalPrice !== 0}
            onClick={() => {
              acceptOrder()
            }}
            type="button"
            className="control-panel__control-button"
          >
            <span className="control-panel__button-text">Accept</span>
          </button>
          <button
            disabled={
              productsState.totalPrice === 0 || productsState.introduced !== 0
            }
            onClick={() => {
              dispatch(setTotal({}, 0))
            }}
            type="button"
            className="control-panel__control-button"
          >
            <span className="control-panel__button-text">Cancel</span>
          </button>
          <button
            onClick={() => {
              dispatch(resetProducts())
            }}
            type="button"
            className="control-panel__control-button"
          >
            <span className="control-panel__button-text">Reset products</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
