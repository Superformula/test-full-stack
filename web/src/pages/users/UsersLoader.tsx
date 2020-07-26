import React, { ReactElement } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Card } from '../../components/card/Card'
import style from './UserModal.module.scss'

export const UserCardLoader = (): ReactElement => (
  <Card>
    <div>
      <Skeleton width={168} height={168} circle />
    </div>
    <div>
      <Skeleton height={20} width={168} />
    </div>
    <Skeleton height={15} width={100} />
  </Card>
)

export const UsersLoader = (): ReactElement => (
  <>
    <UserCardLoader />
    <UserCardLoader />
    <UserCardLoader />
    <UserCardLoader />
    <UserCardLoader />
    <UserCardLoader />
  </>
)

export const UserFormLoader = (): ReactElement => {
  return (
    <>
      <Skeleton width={200} height={40} />
      <div className={style.userFormContent}>
        <Skeleton width={500} height={300} />
        <div className={style.userFormFields}>
          <div className={style.skeletonField}>
            <Skeleton height={45} />
          </div>
          <div className={style.skeletonField}>
            <Skeleton height={45} />
          </div>
          <div className={style.skeletonField}>
            <Skeleton height={45} />
          </div>
          <div className={style.userFormButtons}>
            <Skeleton width={180} height={45} />
            <Skeleton width={180} height={45} />
          </div>
        </div>
      </div>
    </>
  )
}
