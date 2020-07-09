import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "Store";
import { UsersState } from "Store/users/reducer";
import { dismissErrors } from "Store/users/thinks";

const UsersErrors = () => {
  const { errors } = useSelector((state: State): UsersState => state.users);
  const dispatch = useDispatch();
  const dismissHandler = () => dispatch(dismissErrors());

  return (
    <dialog open id="users-errors">
      <h1>Error</h1>
      <ul>
        {errors.map((message: string, i: number) => (
          <li key={message + i}>{message}</li>
        ))}
      </ul>
      <div className="actions">
        <button onClick={dismissHandler}>
          <span>DISMISS</span>
        </button>
      </div>
    </dialog>
  );
};

export default UsersErrors;
