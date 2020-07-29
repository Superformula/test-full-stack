import { useDebounceCallback } from '@react-hook/debounce'
import React, { ReactElement, useCallback, useMemo, useState } from 'react'
import { Input } from '../input/Input'

import styles from './Autocomplete.module.scss'

interface AutocompleteProps {
  value?: string
  placeholder: string
  requestSuggestion: (text: string) => void
  suggestions: any[]
  renderSuggestion: (suggestion: any) => string
  onChange?: (value: string) => void
  onSelect: (value: any) => void
  keyProp: string
  minLength?: number
  name?: string
}

const useAutocomplete = ({
  value,
  onChange,
  suggestions,
  requestSuggestion,
  renderSuggestion,
  keyProp,
  onSelect,
}: AutocompleteProps) => {
  const [activeIndex, setActiveIndex] = useState(2)
  const [open, setOpen] = useState(false)
  const onFocus = useCallback(() => setOpen(true), [])

  // This was necessary because the click on the balloon was triggering the blur and wasn't selecting
  const onBlur = useCallback(() => setTimeout(() => setOpen(false), 200), [])

  const onSelectInternal = useCallback(
    (value: string) => {
      onSelect(value)
      onChange && onChange(renderSuggestion(value))
    },
    [onSelect, onChange, renderSuggestion],
  )
  const onKeyPress = useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>) => {
      if (evt.key === 'ArrowDown') {
        setOpen(true)
        if (activeIndex < suggestions.length - 1) {
          setActiveIndex(activeIndex + 1)
        }
        evt.stopPropagation()
        evt.preventDefault()
      } else if (evt.key === 'ArrowUp') {
        setOpen(true)
        if (activeIndex > -1) {
          setActiveIndex(activeIndex - 1)
        }
        evt.stopPropagation()
        evt.preventDefault()
      } else if (evt.key === 'Enter') {
        onSelect(suggestions[activeIndex])
        setOpen(false)
        evt.stopPropagation()
        evt.preventDefault()
      } else {
        setOpen(true)
      }
    },
    [activeIndex, suggestions, onSelect],
  )

  const debounce = useDebounceCallback(requestSuggestion, 800)
  const onTextChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const value = evt.target.value
      onChange && onChange(value)
      debounce(value)
      setActiveIndex(-1)
    },
    [debounce, onChange],
  )

  const renderedSuggestions = useMemo(
    () =>
      suggestions.map((item: any, index: number) => (
        <li
          key={item[keyProp]}
          className={index === activeIndex ? styles.active : ''}
          onClick={() => onSelectInternal(item)}
        >
          {renderSuggestion(item)}
        </li>
      )),
    [suggestions, renderSuggestion, activeIndex, keyProp, onSelectInternal],
  )

  return useMemo(() => ({ value, open, onFocus, onBlur, onKeyPress, onTextChange, renderedSuggestions }), [
    value,
    open,
    onFocus,
    onBlur,
    onKeyPress,
    onTextChange,
    renderedSuggestions,
  ])
}

export const Autocomplete = (props: AutocompleteProps): ReactElement => {
  const { value, open, onFocus, onBlur, onKeyPress, onTextChange, renderedSuggestions } = useAutocomplete(props)
  return (
    <div className={styles.autocomplete} onBlur={onBlur}>
      <Input
        name={props.name}
        value={value}
        placeholder={props.placeholder}
        type="text"
        onChange={onTextChange}
        onKeyDown={onKeyPress}
        onFocus={onFocus}
      />
      {open && props.suggestions.length ? <ul className={styles.list}>{renderedSuggestions}</ul> : null}
    </div>
  )
}
