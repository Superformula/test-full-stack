import React from 'react'
import './Input.css'

export const Input = ({ value, onChange, label }) => {
  const handleOnChange = (evt) => {
    const { value } = evt.target
    onChange(value)
  }
  return (
    <div className={'input-container'}>
      <p className={'input-label'}>{label}</p>
      <input className={'input-text-box'} value={value} onChange={handleOnChange} placeholder={'Type...'} />
    </div>
  )
}
