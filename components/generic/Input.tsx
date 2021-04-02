import { ReactElement, InputHTMLAttributes } from 'react'

import { HTMLElementType } from '../../interfaces'

import styles from './Input.module.css'

interface HTMLInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  elementType?: HTMLElementType;
  rows?: number;
}

export default function Input({
  elementType = 'input',
  className,
  ...props
}: HTMLInputProps): ReactElement {
  const InputElement = elementType

  return (
    <InputElement {...props} className={`${styles.textbox} ${className}`} />
  )
}
