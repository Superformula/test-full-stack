import React from 'react';
import './SearchBar.css';

export const SearchBar = ({ value, label, placeholder, onChange }) => {
  const handleOnChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={'search-bar-container'}>
      <h1>{label}</h1>
      <input value={value} onChange={handleOnChange} type={'text'} placeholder={placeholder}/>
    </div>
  )
};
