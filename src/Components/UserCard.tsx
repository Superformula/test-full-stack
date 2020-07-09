import React from "react";
import { User } from "Store/users/reducer";

const UserCard = ({ user, onClick }: { user: User; onClick: any }) => {
  return (
    <div className="card" onClick={(e) => onClick(user)}>
      <article
        className="avatar"
        style={{ backgroundImage: `url(${user.avatarHref})` }}
      />
      <h2>{user.name}</h2>
      <p>{user.description}</p>
    </div>
  );
};

export default UserCard;
