import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import querystring from "query-string";
import { State, ThunkDispatch } from "Store";
import { UsersState } from "Store/users/reducer";
import { getUsers } from "Store/users/thinks";
import "Styles/Home.scss";
import UsersList from "Components/UsersList";
import UsersErrors from "Components/UsersErrors";

const Home = () => {
  const { errors, isGetRequestLoading } = useSelector(
    (state: State): UsersState => state.users
  );
  const dispatch: ThunkDispatch = useDispatch();
  const location = useLocation();
  const queryParams = querystring.parse(location.search);
  const page = Number(queryParams.page || 1);

  useEffect(() => {
    dispatch(getUsers(page));
  }, [page]);

  return (
    <div id="home" className="page-container">
      {isGetRequestLoading ? <progress /> : <UsersList currentPage={page} />}
      {errors.length > 0 && <UsersErrors />}
    </div>
  );
};

export default Home;
