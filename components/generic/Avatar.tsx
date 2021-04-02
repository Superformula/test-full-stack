import { ReactElement, ImgHTMLAttributes } from 'react'

import styles from './Avatar.module.css'

export default function Avatar({
  src,
  width = '126',
  height = '126',
  className,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>): ReactElement {
  return (
    <img
      src={src}
      width={width}
      height={height}
      className={`${styles.avatar} ${className}`}
      {...rest}
    />
  )
}
