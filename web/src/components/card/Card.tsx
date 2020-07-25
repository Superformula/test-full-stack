import React, { ReactElement, ReactNode } from 'react'
import style from './Card.module.scss'

interface CardProps {
  children: ReactNode
}

export const Card = ({ children }: CardProps): ReactElement => <div className={style.card}>{children}</div>
