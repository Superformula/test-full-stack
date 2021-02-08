import React from 'react'
import './Modal.css'

export const Modal = ({ children, open }) => {
  const showHideClassName = open ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
      </section>
    </div>
  )
}
