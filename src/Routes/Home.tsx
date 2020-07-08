import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, ThunkDispatch } from "Store";
import { UsersState } from "Store/users/reducer";
import { getUsers } from "Store/users/thinks";
import UsersList from "Components/UsersList";
import UsersErrors from "Components/UsersErrors";

const Home = () => {
  const { errors, isGetRequestLoading } = useSelector(
    (state: State): UsersState => state.users
  );
  const dispatch: ThunkDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div id="home" className="page-container">
      {isGetRequestLoading ? <progress /> : <UsersList />}
      {errors.length > 0 && <UsersErrors />}
    </div>
  );
};

export default Home;
