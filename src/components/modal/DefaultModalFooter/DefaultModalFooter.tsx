import React from 'react';
import './DefaultModalFooter.scss';
import { Button } from '../../button/Button';

interface ModalProps {
  onCancelText?: string
  onOkText?: string
  onCancelClick: () => void
  onOkClick: () => void
}

// eslint-disable-next-line import/prefer-default-export
export const DefaultModalFooter: React.FC<ModalProps> = ({
  onCancelText = 'SAVE',
  onOkText = 'CANCEL',
  onCancelClick,
  onOkClick,
}) => (
  <div className="base-modal-footer">
    <Button text={onCancelText} color="primary" onClick={onCancelClick} />
    <Button text={onOkText} color="primary" onClick={onOkClick} />
  </div>
);
