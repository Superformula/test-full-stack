import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

interface Props {
  children: ReactNode,
  isOpen: boolean,
  onClose?: () => void,
}

function Modal({ isOpen, onClose, children } : Props) {
  return ReactDOM.createPortal(
    <div className={`${styles.modalBackground} ${!isOpen ? styles.hidden: ''}`} onClick={onClose} >
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal')!
  );
}

export default Modal;
