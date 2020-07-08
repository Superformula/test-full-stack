import React, { useState, useEffect } from "react";
import { User } from "Store/users/reducer";

const UserCard = ({ user, onClick }: { user: User; onClick: any }) => {
  const [avatarImageHref, setAvatarImageHref] = useState(undefined);

  useEffect(() => {
    window
      .fetch(
        `https://api.unsplash.com/photos/random?client_id=LtRzXOc8vfRgfRE10dqHzXNNdHbvQ3ZF2LfVGV9nXDo&randomizer=${user.UserID}`
      )
      .then((result) =>
        result.ok
          ? result.json()
          : {
              urls: {
                thumb:
                  "https://popgun.blob.core.windows.net/popgunv3resize/macho-man-champion-2017-05-11.jpg",
              },
            }
      )
      .then(({ urls }) => setAvatarImageHref(urls.thumb));
  }, [user.UserID]);

  return (
    <div className="card" onClick={(e) => onClick(user)}>
      {avatarImageHref && (
        <article
          className="avatar"
          style={{ backgroundImage: `url(${avatarImageHref})` }}
        />
      )}
      <h2>{user.name}</h2>
      <p>{user.description}</p>
    </div>
  );
};

export default UserCard;
