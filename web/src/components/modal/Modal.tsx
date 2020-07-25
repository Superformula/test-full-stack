import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import usePortal from 'react-cool-portal'
import style from './Modal.module.scss'
import classNames from 'classnames'

interface ModalProps {
  children: ReactNode
  width?: number
  height?: number
  trigger: ReactNode
  onClose?: VoidFunction
}

interface ModalController {
  close: VoidFunction
}

export const ModalContext = React.createContext<ModalController>({
  close: () => {},
})

export const useModal = (onClose?: VoidFunction) => {
  const [fading, setFading] = useState(false)
  const close = useCallback(() => setFading(true), [])

  const { Portal, show, hide, isShow } = usePortal({
    defaultShow: false,
    escToHide: false,
  })

  const handleAnimEnd = useCallback((): void => {
    if (!fading) return
    setFading(false)
    hide()
    onClose && onClose()
  }, [fading, hide, onClose])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (isShow && e.code === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeyDown)
    return (): void => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isShow, close])

  const controller: ModalController = useMemo(() => ({ close }), [close])

  return useMemo(() => ({ fading, show, handleAnimEnd, Portal, controller }), [
    fading,
    show,
    handleAnimEnd,
    Portal,
    controller,
  ])
}

export const Modal = ({ children, width, height, trigger, onClose }: ModalProps): ReactElement => {
  const { fading, handleAnimEnd, show, Portal, controller } = useModal(onClose)

  const backdropClass = useMemo(
    () =>
      classNames({
        [style.modal]: true,
        [style.fading]: fading,
      }),
    [fading],
  )

  const windowClass = useMemo(
    () =>
      classNames({
        [style.modalWindow]: true,
        [style.fading]: fading,
      }),
    [fading],
  )

  const windowStyle = useMemo(() => ({ width, height }), [width, height])

  return (
    <ModalContext.Provider value={controller}>
      <div className={style.modalTrigger} onClick={show}>
        {trigger}
      </div>
      <Portal>
        <div className={backdropClass}>
          <div onAnimationEnd={handleAnimEnd} className={windowClass} style={windowStyle}>
            {children}
          </div>
        </div>
      </Portal>
    </ModalContext.Provider>
  )
}
