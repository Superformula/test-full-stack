import { ReactElement } from 'react'

import styles from './Loader.module.css'

export default function Loader(): ReactElement {
  return (
    <div className={styles.wrapper}>
      <img src="/loader.gif" alt="Loading..." /> Loading...
    </div>
  )
}
