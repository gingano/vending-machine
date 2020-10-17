import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

const modalRoot = document.getElementById('modal')

const Modal = ({ children }) => {
  const element = document.createElement('div')

  useEffect(() => {
    modalRoot.appendChild(element)

    return () => {
      modalRoot.removeChild(element)
    }
  }, [element])

  return createPortal(
    <div className="modal-container">
      <div className="modal">{children}</div>
    </div>,
    element
  )
}

export default Modal
