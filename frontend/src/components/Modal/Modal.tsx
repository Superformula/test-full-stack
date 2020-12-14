import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
  ref: any;
};

export interface ModalControls {
  openModal(): void;
  closeModal(): void;
}

// eslint-disable-next-line react/display-name
const Modal: React.FC<Props> = forwardRef(({ children }, ref) => {
  const [display, setDisplay] = useState(false);

  // Attaches methods on the ref passed to the modal
  useImperativeHandle(ref, () => ({
    openModal: () => open(),
    closeModal: () => close(),
  }));

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  // Open portal to root
  if (display) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper">
        <div
          onClick={close}
          onKeyDown={close}
          role="button"
          className="modal-backdrop"
          aria-label="Close modal"
          tabIndex={0}
        />
        <div className="modal-box">{children}</div>
      </div>,
      document.getElementById('modal-root') as HTMLElement,
    );
  }

  return null;
});

export default Modal;
