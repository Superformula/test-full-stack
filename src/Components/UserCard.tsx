import React from "react";
import { User } from "Store/users/reducer";

const UserCard = ({ user, onClick }: { user: User; onClick: any }) => {
  return (
    <div className="card user" onClick={(e) => onClick(user.UserID)}>
      <img
        className="edit-icon"
        src={`${process.env.PUBLIC_URL}/edit-icon.png`}
      />
      <div className="avatar">
        <article style={{ backgroundImage: `url(${user.avatarHref})` }} />
      </div>
      <div className="name-created">
        <h2>{user.name}</h2>
        <span className="created">
          created{" "}
          <strong className="date">
            {new Date(Number(user.createdAt)).toLocaleDateString()}
          </strong>
        </span>
      </div>
      <p>{user.description}</p>
    </div>
  );
};

export default UserCard;
