import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import { Modal } from '../../../../../components/modal/Modal';
import { User } from '../../../../../types';
import useToggle from '../../../../../hooks/useToggle';
import { DefaultModalFooter } from '../../../../../components/modal/DefaultModalFooter/DefaultModalFooter';
import { Map } from './Map/Map';
import { Input } from '../../../../../components/input/Input';
import useUpdateUser from '../../../../../hooks/useUpdateUser';
import editIcon from '../../../../../assets/icons/edit.svg';
import './UserEdit.scss';

interface UserEditProps {
  user: User
  className?: string
}

const UserEdit: React.FC<UserEditProps> = ({ user, className }) => {
  const [isOpen, open, close] = useToggle(false);
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const { update, loading } = useUpdateUser();

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const submitForm = useCallback(async () => {
    await update(updatedUser);
    close();
  }, [close, update, updatedUser]);

  return (
    <div className={classnames(className)}>
      <button type="button" onClick={open} className="user-edit-icon">
        <img src={editIcon} alt="edit" />
      </button>
      <Modal isOpen={isOpen} title="Edit user" footer={(<DefaultModalFooter onCancelClick={close} onOkClick={submitForm} buttonsDisabled={loading} />)}>
        <div className="modal-content">
          <Map address={user.address} className="modal-content-map" />
          <div className="modal-content-form">
            <Input
              name="name"
              onChange={handleFieldChange}
              value={updatedUser.name}
              label="Name"
              placeholder="Name"
              className="modal-content-form-input"
            />
            <Input
              name="address"
              onChange={handleFieldChange}
              value={updatedUser.address}
              label="Address"
              placeholder="Address"
              className="modal-content-form-input"
            />
            <Input
              name="description"
              onChange={handleFieldChange}
              value={updatedUser.description}
              label="Description"
              placeholder="Description"
              className="modal-content-form-input"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(UserEdit);
