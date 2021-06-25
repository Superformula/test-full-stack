import React, { ReactNode, useEffect } from 'react';
import './Modal.scss';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { Typography } from '../typograph/Typography';

interface ModalProps {
  isOpen: boolean
  title: string
  footer?: ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  children, isOpen, title, footer,
}) => {
  const portalRoot = document.getElementById('modal-root')!;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isOpen]);

  return ReactDOM.createPortal((
    <CSSTransition
      in={isOpen}
      timeout={300}
      unmountOnExit
    >
      <div className={classnames('modal-overlay', { 'modal-overlay-visible': isOpen })}>
        <div className={classnames('modal-wrapper', { 'modal-wrapper-visible': isOpen, 'modal-wrapper-not-visible': !isOpen })}>
          <div className="modal-wrapper-header">
            <Typography variant="h1">
              {title}
            </Typography>
          </div>

          <div className="modal-wrapper-content">
            {children}
          </div>

          {footer && (
          <div className="modal-wrapper-footer">
            {footer}
          </div>
          )}
        </div>
      </div>
    </CSSTransition>
  ), portalRoot);
};
