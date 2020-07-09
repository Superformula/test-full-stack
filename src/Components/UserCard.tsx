import React from "react";
import { User } from "Store/users/reducer";

const UserCard = ({ user, onClick }: { user: User; onClick: any }) => {
  return (
    <div className="card user" onClick={(e) => onClick(user)}>
      <div className="avatar">
        <article style={{ backgroundImage: `url(${user.avatarHref})` }} />
      </div>
      <h2>{user.name}</h2>
      <p>{user.description}</p>
    </div>
  );
};

export default UserCard;
