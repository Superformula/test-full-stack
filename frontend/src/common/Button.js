import React from 'react'
import './Button.css'

export const Button = ({ label, onClick }) => {
  return (
    <div className={'app-button-container'}>
      <button className={'app-button'} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}
