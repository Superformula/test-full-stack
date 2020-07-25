import React, { ReactElement } from 'react'

import style from './Input.module.scss'

export const Input = (props: React.HTMLProps<HTMLInputElement>): ReactElement => (
  <div className={style.input}>
    {props.placeholder && props.value && <div className={style.placeholder}>{props.placeholder}</div>}
    <input {...props} />
  </div>
)
