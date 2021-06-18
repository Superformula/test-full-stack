import React, { ReactNode } from 'react';
import './Modal.scss';
import classnames from 'classnames';
import { Typography } from '../typograph/Typography';

interface ModalProps {
  isOpen: boolean
  title: string
  footer?: ReactNode
}

// eslint-disable-next-line import/prefer-default-export
export const Modal: React.FC<ModalProps> = ({
  children, isOpen, title, footer,
}) => (
  <div className={classnames('modal-overlay', { 'modal-overlay-visible': isOpen })}>
    <div className={classnames('modal-wrapper', { 'modal-wrapper-visible': isOpen })}>
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
);
