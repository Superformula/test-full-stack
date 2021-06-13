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
import classes from './Modal.module.scss';
import { ChildrenProps } from '../General';
import { User } from '../../generated/graphql';

interface ModalController {
  openDialog(user: User): void;
  closeDialog(): void;
  isShow: boolean;
  user?: User;
}

const ModalContext = React.createContext<ModalController>({
  openDialog: () => undefined,
  closeDialog: () => undefined,
  isShow: false,
});

export function useUserEditModal(): ModalController {
  return useContext(ModalContext);
}

interface ModalProviderProps extends ChildrenProps {
  className?: string;
  modalComponent: ReactNode;
}

function UserEditModalProviderComponent(props: ModalProviderProps) {
  const [user, setUser] = useState<User>();
  const [isShow, setShow] = useState(false);
  const { children, className } = props;

  const openDialog = useCallback((user: User) => {
    setUser(user);
    setShow(true);
  }, []);
  const closeDialog = useCallback(() => {
    setUser(undefined);
    setShow(false);
  }, []);

  const controller: ModalController = useMemo(
    () => ({ openDialog, closeDialog, isShow, user }),
    [openDialog, closeDialog, isShow, user]
  );

  const dialog = useMemo(() => {
    if (!isShow) {
      return null;
    }

    return createPortal(
      <div className={classNames(classes.modal, className)}>
        <div className={classes.backdrop} onClick={closeDialog} />
        <div className={classes.modalWindow}>{props.modalComponent}</div>
      </div>,
      document.body
    );
  }, [className, closeDialog, isShow]);

  return (
    <ModalContext.Provider value={controller}>
      {children}
      {dialog}
    </ModalContext.Provider>
  );
}

export const UserEditModalProvider = memo(UserEditModalProviderComponent);
