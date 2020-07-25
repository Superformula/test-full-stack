import React, { ReactElement } from 'react'
import style from './Avatar.module.scss'

interface AvatarProps {
  src: string
  alt: string
}

export const Avatar = ({ src, alt }: AvatarProps): ReactElement => (
  <div className={style.avatar}>
    <img src={src} alt={alt} />
  </div>
)
