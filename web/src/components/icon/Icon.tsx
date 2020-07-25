import React, { ReactElement, useMemo } from 'react'

import styles from './Icon.module.scss'

export interface IconProps {
  Component: any
  size?: number
  color?: string
}

export const Icon = ({ Component, size, color }: IconProps): ReactElement => {
  const style = useMemo(() => ({ width: size, height: size, fill: color }), [color, size])
  return <Component className={styles.icon} style={style} />
}

Icon.defaultProps = {
  size: 32,
}
