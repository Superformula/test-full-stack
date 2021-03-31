import { ReactElement, ReactNode, forwardRef } from 'react'
import Link from 'next/link'

import Avatar from '../generic/Avatar'
import EditIcon from '../icons/EditIcon'
import TrashIcon from '../icons/TrashIcon'
import User from '../../models/user'
import { formatDate } from '../../utils/date-helpers'

import styles from './UserCard.module.css'

interface RefProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface Props {
  user: User;
  onUserDelete: (userId: string) => Promise<void>;
}

export default function UserCard({ user, onUserDelete }: Props): ReactElement {
  const LinkChildWrapper = forwardRef<HTMLAnchorElement, RefProps>(function LinkChildWrapper({ children, onClick, href }: { children: ReactNode, onClick: () => void, href: string }, ref) {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        {children}
      </a>
    )
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.actionButtonsWrapper}>
        <span className={styles.actionButton} title="Edit User">
          {/* Ref: https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-function-component */}
          <Link as={`/users/${user.id}`} href={`/?userId=${user.id}`} passHref>
            <LinkChildWrapper>
              <EditIcon />
            </LinkChildWrapper>
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
          <h3 className={styles.heading}>
            {user.name}
          </h3>
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
