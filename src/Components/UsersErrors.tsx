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
      <h2>Error</h2>
      <ul>
        {errors.map((message: string, i: number) => (
          <li key={message + i}>{message}</li>
        ))}
      </ul>
      <button onClick={dismissHandler}>
        <span>Dismiss</span>
      </button>
    </dialog>
  );
};

export default UsersErrors;
