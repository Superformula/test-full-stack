import { ReactElement, LegacyRef } from 'react'

import styles from './Mapbox.module.css'

interface Props {
  forwardRef: LegacyRef<HTMLDivElement>;
}

export default function Mapbox({ forwardRef }: Props): ReactElement {
  return <div className={styles.map} ref={forwardRef} />
}
