import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setProducts,
  resetProducts,
  resetHelpers,
} from '../redux/actions/products'
import useResult from '../hooks/useResult'
import Categories from './Categories'
import ControlPanel from './ControlPanel'
import Modal from './Modal'

const Machine = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const [currentChange, setCurrentChange] = useState({})
  const productsState = useSelector(({ products }) => products)
  const dispatch = useDispatch()

  const changeArray = []

  Object.entries(currentChange).forEach(([key, value]) => {
    for (let i = 0; i < value; i++) {
      changeArray.push(Number(key))
    }
  })

  const closeModal = () => {
    dispatch(resetHelpers())
    setModalIsOpened(false)
  }

  useResult(
    dispatch,
    productsState,
    setProducts,
    setCurrentChange,
    setModalIsOpened
  )

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
          <h2 className="modal__heading">Here is your order and change</h2>
          <ul className="modal__order-list">
            {Object.entries(productsState.totalItems).map(
              ([key, value]) =>
                value > 0 && (
                  <li key={`modal-${key}`} className="modal__order-item">
                    {`${key} x ${value}`}
                  </li>
                )
            )}
          </ul>
          <ul className="modal__change-list">
            {changeArray
              .sort((a, b) => b - a)
              .map((item) => (
                <li
                  key={Math.random()}
                  className={`modal__change-item modal__change-item--${
                    item < 1 && 'small'
                  }`}
                >
                  {`${item >= 1 ? '£' : ''}${item >= 1 ? item : item * 100}`}
                </li>
              ))}
          </ul>
          <button
            onClick={() => {
              closeModal()
            }}
            type="button"
            className="modal__close-button"
          >
            <span className="modal__button-text">close</span>
          </button>
        </Modal>
      )}
    </div>
  )
}

export default Machine
