import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, ThunkDispatch } from "Store";
import { UsersState } from "Store/users/reducer";
import { getUsers } from "Store/users/thinks";

const Home = () => {
  const {
    data,
    errors,
    isGetRequestLoading,
    isMutationRequestLoading,
  } = useSelector((state: State): UsersState => state.users);
  const dispatch: ThunkDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(undefined));
  }, []);

  return (
    <>
      <h1>Header</h1>
      <h2>Subheader</h2>
      <p>{JSON.stringify(data, null, 2)}</p>
      <label>Label</label>
      <input type="text" placeholder="Placeholder" />
      <button>
        <span>TEXT</span>
      </button>
    </>
  );
};

export default Home;
