import {
  useState,
  useEffect,
  useRef,
  ReactElement,
  ReactNode,
  KeyboardEvent
} from 'react'
import { createPortal } from 'react-dom'

import { useIsClient } from '../../hooks/useIsClient'

import styles from './Modal.module.css'

interface Props {
  isOpen: boolean;
  onHide: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({
  isOpen,
  onHide,
  children,
  title
}: Props): ReactElement {
  // To account for the case when server rendered content
  // differs from the client's.
  // We return NULL during initial render both on server and client.
  const [isClient] = useIsClient()

  const [isActive, setIsActive] = useState(false)
  const modalBackdrop = useRef(null)

  // Basic modal animation and event handling
  useEffect(() => {
    const { current } = modalBackdrop
    const transitionEnd = (): void => setIsActive(isOpen)

    const clickHandler = (event: KeyboardEvent): void => {
      event.target === current && onHide()
    }

    if (current) {
      current.addEventListener('transitionend', transitionEnd)
      current.addEventListener('click', clickHandler)
    }

    if (isOpen) {
      window.setTimeout(() => {
        setIsActive(isOpen)
      }, 10)
    }

    return (): void => {
      if (current) {
        current.removeEventListener('transitionend', transitionEnd)
        current.removeEventListener('click', clickHandler)
      }
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Handle closing a modal by clicking `Esc`
    const onKeyDown: (event: KeyboardEvent<HTMLElement>) => void = (
      event: KeyboardEvent<HTMLElement>
    ): void => {
      if (event.code === 'Escape' && isOpen) {
        onHide()
      }
    }

    // Disable scrolling to not allow the user
    // to interact with elements outside the modal.
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')

    // @ts-expect-error TS unexpectedly complains about types here.
    window.addEventListener('keydown', onKeyDown)

    return (): void => {
      // @ts-expect-error TS unexpectedly complains about types here.
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const modal = (
    <div
      ref={modalBackdrop}
      className={`${styles.backdrop} ${
        isActive && isOpen && styles.backdropActive
      }`}
    >
      <div
        className={`${styles.wrapper} ${
          isActive && isOpen && styles.wrapperActive
        }`}
        aria-modal
        aria-labelledby={title}
        tabIndex={-1}
        role="dialog"
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <h4 className={styles.title}>{title}</h4>
            <button
              className={styles.closeButton}
              onClick={onHide}
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  )

  return (isOpen || isActive) && isClient
    ? createPortal(modal, document.body)
    : null
}
