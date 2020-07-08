import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "Store";
import { mutateUser } from "Store/users/thinks";

const UserDetailModal = ({
  user,
  closeHandler,
}: {
  user: any;
  closeHandler: any;
}) => {
  const { name, address, description } = user;
  const [formState, setFormState] = useState({ name, address, description });
  const dispatch: ThunkDispatch = useDispatch();
  const handleFormFieldChange = (key: string) => (e: any) => {
    const { value } = e.target;

    setFormState((state) => ({ ...state, [key]: value }));
  };
  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      mutateUser({ user, updatedData: formState, callback: closeHandler })
    );
  };

  return (
    <div className="modal-background">
      <div className="inner">
        <div className="modal">
          <form onSubmit={formSubmitHandler}>
            <label>Name</label>
            <input
              type="text"
              placeholder="type a name..."
              value={formState.name}
              onChange={handleFormFieldChange("name")}
            />
            <label>Location</label>
            <input
              type="text"
              placeholder="type an address..."
              value={formState.address}
              onChange={handleFormFieldChange("address")}
            />
            <label>Description</label>
            <input
              type="text"
              placeholder="type a description..."
              value={formState.description}
              onChange={handleFormFieldChange("description")}
            />
            <button onClick={closeHandler}>
              <span>CANCEL</span>
            </button>
            <button type="submit">
              <span>SAVE</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
