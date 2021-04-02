import { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Avatar from '../generic/Avatar'
import LinkFunctionalChildWrapper from '../generic/LinkFunctionalChildWrapper'
import EditIcon from '../icons/EditIcon'
import TrashIcon from '../icons/TrashIcon'
import User from '../../models/user'
import { formatDate } from '../../utils/date-helpers'
import { parsePageQueryParam } from '../../utils/helpers'

import styles from './UserCard.module.css'

interface Props {
  user: User;
  onUserDelete: (userId: string) => Promise<void>;
}

export default function UserCard({ user, onUserDelete }: Props): ReactElement {
  const router = useRouter()
  const pageQueryParam = parsePageQueryParam(router.query)

  return (
    <div className={styles.wrapper}>
      <div className={styles.actionButtonsWrapper}>
        <span className={styles.actionButton} title="Edit User">
          <Link
            as={`/users/${user.id}?page=${pageQueryParam}`}
            href={`/?userId=${user.id}&page=${pageQueryParam}`}
            passHref
            scroll={false}
          >
            <LinkFunctionalChildWrapper>
              <EditIcon />
            </LinkFunctionalChildWrapper>
          </Link>
        </span>
        <span
          className={styles.actionButton}
          title="Delete User"
          onClick={(): Promise<void> => onUserDelete(user.id)}
        >
          <TrashIcon />
        </span>
      </div>
      <Avatar
        src={`https://source.unsplash.com/126x126/?portrait,face,${user.id}`}
        className={styles.avatar}
        alt={user.name}
      />
      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.heading}>{user.name}</h3>
          <span className={styles.meta}>
            created{' '}
            <span className={styles.date}>{formatDate(user.createdAt)}</span>
          </span>
        </div>
        <p className={styles.description}>{user.description}</p>
      </div>
    </div>
  )
}
