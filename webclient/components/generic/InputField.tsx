import React, { ReactElement, InputHTMLAttributes } from 'react'

import Input from './Input'

import { HTMLElementType } from '../../interfaces'

import styles from './InputField.module.css'

interface HTMLInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  elementType?: HTMLElementType;
  rows?: number;
}

export default function InputField({
  label,
  elementType = 'input',
  ...props
}: HTMLInputProps): ReactElement {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <Input {...props} elementType={elementType} />
    </div>
  )
}
