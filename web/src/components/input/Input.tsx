import classNames from 'classnames'
import React, { ReactElement, useMemo } from 'react'

import style from './Input.module.scss'

type InputProps = React.HTMLProps<HTMLInputElement> & {
  /**
   * This variable, when set to false, won't create any padding on top
   * of the field and nor any placeholder will be present when the field
   * has value
   */
  placeholderOnTop?: boolean
}

export const Input = ({ placeholderOnTop, ...props }: InputProps): ReactElement => {
  const classes = useMemo(
    () =>
      classNames({
        [style.input]: true,
        [style.padded]: placeholderOnTop !== false,
      }),
    [placeholderOnTop],
  )
  return (
    <div className={classes}>
      {placeholderOnTop !== false && props.placeholder && props.value && (
        <div className={style.placeholder}>{props.placeholder}</div>
      )}
      <input {...props} />
    </div>
  )
}
