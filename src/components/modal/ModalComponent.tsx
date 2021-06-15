import classNames from 'classnames';
import React, {
  memo,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { User } from '../../generated/graphql';
import { ChildrenProps } from '../General';
import classes from './Modal.module.scss';

interface ModalController {
  openDialog(user: User): void;
  closeDialog(): void;
  isShow: boolean;
  modalProps?: any;
}

const ModalContext = React.createContext<ModalController>({
  openDialog: () => undefined,
  closeDialog: () => undefined,
  isShow: false,
});

export function useModal(): ModalController {
  return useContext(ModalContext);
}

interface ModalProviderProps extends ChildrenProps {
  className?: string;
  modalComponent: ReactNode;
}

function UserEditModalProviderComponent(props: ModalProviderProps) {
  const [modalProps, setModalProps] = useState<any>();
  const [isShow, setShow] = useState(false);
  const { children, className } = props;

  const openDialog = useCallback((user: any) => {
    setModalProps(user);
    setShow(true);
  }, []);
  const closeDialog = useCallback(() => {
    setModalProps(undefined);
    setShow(false);
  }, []);

  const controller: ModalController = useMemo(
    () => ({ openDialog, closeDialog, isShow, modalProps }),
    [openDialog, closeDialog, isShow, modalProps]
  );

  const dialog = useMemo(() => {
    if (!isShow) {
      return null;
    }

    return createPortal(
      <div className={classNames(classes.modal, className)}>
        <div className={classes.modal__backdrop} onClick={closeDialog} />
        <div className={classes.modal__modalWindow}>{props.modalComponent}</div>
      </div>,
      document.body
    );
  }, [className, closeDialog, isShow, props.modalComponent]);

  return (
    <ModalContext.Provider value={controller}>
      {children}
      {dialog}
    </ModalContext.Provider>
  );
}

export const UserEditModalProvider = memo(UserEditModalProviderComponent);
