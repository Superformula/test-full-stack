import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import styles from './UserModal.module.scss';
import { User } from '../../types';
import Button from '../Button/Button';
import Input from '../Input/Input';

type Props = {
  user?: User;
  onClose: () => void;
  onSave: (user: User) => void;
};

const Modal: React.FC<Props> = ({ user, onClose, onSave }) => {
  const [userInModal, setUserInModal] = useState<User>({
    id: '',
    name: '',
  });
  const handleUserPropertyUpdate = (property: string, newValue: string) => {
    setUserInModal({
      ...userInModal,
      [property]: newValue,
    });
  };

  useEffect(() => setUserInModal(user || userInModal), [JSON.stringify(user)]);

  return (
    <div
      className={classnames({
        [styles.modal]: true,
        [styles['modal--in']]: user,
        [styles['modal--out']]: userInModal.id && !user,
      })}
    >
      <div
        className={styles.backdrop}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          event.target === event.currentTarget && onClose()
        }
      >
        <div className={styles.content}>
          <div className={styles.header}>Edit user</div>
          <form
            className={styles.form}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              onSave(userInModal);
            }}
          >
            <div className={styles.map}></div>
            <div className={styles.rightPanel}>
              <Input
                id="name"
                label="Name"
                value={userInModal.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleUserPropertyUpdate('name', event.target.value)
                }
              />
              <Input
                id="address"
                label="Address"
                value={userInModal?.address}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleUserPropertyUpdate('address', event.target.value)
                }
              />
              <Input
                id="description"
                label="Description"
                value={userInModal.description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleUserPropertyUpdate('description', event.target.value)
                }
              />
              <div className={styles.buttons}>
                <Button type="submit" variant="primary">
                  Save
                </Button>
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
