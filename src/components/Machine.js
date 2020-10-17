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
