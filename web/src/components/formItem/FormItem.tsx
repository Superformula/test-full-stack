import { FieldValidator } from 'final-form'
import React, { cloneElement, isValidElement, ReactElement, ReactNode } from 'react'
import { Field } from 'react-final-form'

import style from './FormItem.module.scss'

export interface FormItemProps {
  children: ReactNode
  name: string
  validate?: FieldValidator<any>
}

export const FormItem = ({ children, validate, name }: FormItemProps): ReactElement => (
  <Field
    name={name}
    validate={validate}
    render={({ input, meta }) => (
      <div
        className={`${style.formInput} ${style.formItem} ${meta.touched && meta.error ? style.formItemWithError : ''}`}
      >
        {isValidElement(children)
          ? Array.isArray(children)
            ? children.map((child) => cloneElement(child, input))
            : cloneElement(children, input)
          : children}
        {meta.touched && <div className={style.formItemError}>{meta.error}</div>}
      </div>
    )}
  />
)
