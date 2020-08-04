import React from "react";

import Button from "../../components/Button/Button";
import UserCard from "../UserCard/UserCard";

const UserList = (props) => {
  return (
    <React.Fragment>
      <div className="middle-row">
        {props.users.map((user) => {
          return (
            <UserCard
              key={user.id}
              onEditClick={props.onEditClick}
              user={user}
              picturesList={props.picturesList}
            />
          );
        })}
      </div>
      {props.showLoadMore ? (
        <div className="bottom-row">
          <Button variant="primary" onClick={props.onLoadMore}>
            Load More
          </Button>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default UserList;
