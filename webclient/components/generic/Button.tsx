import { ReactElement, ButtonHTMLAttributes } from 'react'

import styles from './Button.module.css'

export default function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement {
  return (
    <div className={styles.wrapper}>
      <button {...props} className={styles.button}>
        {children}
      </button>
    </div>
  )
}
