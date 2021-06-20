import React from 'react';
import './DefaultModalFooter.scss';
import { Button } from '../../button/Button';

interface ModalProps {
  onCancelText?: string
  onOkText?: string
  onCancelClick: () => void
  onOkClick: () => void
  buttonsDisabled?: boolean
}

export const DefaultModalFooter: React.FC<ModalProps> = ({
  onCancelText = 'CANCEL',
  onOkText = 'SAVE',
  onCancelClick,
  onOkClick,
  buttonsDisabled,
}) => (
  <div className="base-modal-footer">
    <Button text={onOkText} color="primary" onClick={onOkClick} disabled={buttonsDisabled} />
    <Button text={onCancelText} color="primary" onClick={onCancelClick} disabled={buttonsDisabled} />
  </div>
);
