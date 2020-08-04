import React, { useState } from "react";

import UserCard from "../UserCard/UserCard";

const UserList = (props) => {
  const [usersList, setUsersList] = useState(props.users);
  const [nextToken, setNextToken] = useState(props.token);

  console.log(nextToken);
  return (
    <React.Fragment>
      {usersList.map((user) => {
        return (
          <UserCard
            key={user.id}
            onPencilClick={props.onEditClick}
            user={user}
          />
        );
      })}
    </React.Fragment>
  );
};
export default UserList;
