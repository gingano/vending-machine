import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setProducts,
  setTotal,
  setIntroduced,
  resetProducts,
} from '../redux/actions/products'
import Categories from './Categories'
import ControlPanel from './ControlPanel'
import Modal from './Modal'

const Machine = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const [currentChange, setCurrentChange] = useState({})
  const productsState = useSelector(({ products }) => products)
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setTotal({}, 0))
    dispatch(setIntroduced(0))
    setModalIsOpened(false)
  }

  const countChange = (denominations, totalPrice, introduced) => {
    let change = introduced - totalPrice
    change = parseFloat(change.toFixed(2))
    const denominationsCount = {}

    denominations.forEach((denomination) => {
      const integerDivision = Math.floor(change / denomination)
      if (integerDivision > 0) {
        denominationsCount[denomination] = integerDivision
        change = parseFloat(
          (change - denomination * integerDivision).toFixed(2)
        )
      }
    })

    return denominationsCount
  }

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

  return (
    <div className="machine">
      <button
        onClick={() => {
          dispatch(resetProducts())
        }}
        type="button"
        className="machine__reset-button"
      >
        reset products
      </button>
      <Categories />
      <ControlPanel />
      {modalIsOpened && (
        <Modal>
          <button
            onClick={() => {
              closeModal()
            }}
            type="button"
            className="modal__close-modal"
          >
            close
          </button>
          <ul className="modal__change-list">
            {Object.entries(productsState.totalItems).map(
              ([key, value]) =>
                value > 0 && (
                  <li key={`modal-${key}`} className="modal__change-item">
                    {`${key} x ${value}`}
                  </li>
                )
            )}
          </ul>
          <ul className="modal__change-list">
            {Object.entries(currentChange).map(([key, value]) => (
              <li key={`modal-${key}`} className="modal__change-item">
                {`${key} x ${value}`}
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  )
}

export default Machine
