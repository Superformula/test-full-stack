import classNames from 'classnames'
import React, { ReactNode, useMemo } from 'react'
import style from './Button.module.scss'

declare type ButtonType = 'primary' | 'default'

declare type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type?: ButtonType
  children: ReactNode
  htmlType?: 'submit' | 'button'
}

export const Button = ({ type, children, htmlType, ...props }: ButtonProps) => {
  const classes = useMemo(
    () =>
      classNames({
        [style.button]: true,
        [style.default]: type === 'default' || !type,
        [style.primary]: type === 'primary' || !type,
      }),
    [type],
  )
  return (
    <button className={classes} {...props} type={htmlType}>
      {children}
    </button>
  )
}
