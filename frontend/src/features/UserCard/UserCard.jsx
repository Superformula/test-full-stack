import React, { useState } from "react";

import Avatar from "../../components/Avatar/Avatar";
import Card from "../../components/Card/Card";
import Pencil from "../../icons/Pencil";
import Typography from "../../components/Typography/Typography";

import "./UserCard.css";

// TODO: show edit button and user createdAt onHover only
const UserCard = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseHover = () => {
    toggleIsHovering();
  };

  const toggleIsHovering = () => {
    setIsHovering(!isHovering);
  };

  // Consistently show the same picture for users across loads through modulo operation
  const pictureUrl =
    props.picturesList.results[props.user.createdAt % 23].urls.small;

  const onPencilClick = () => {
    props.onEditClick(props.user);
  };

  const onCardClick = () => {
    props.onEditClick(props.user);
  };

  return (
    <Card
      className="usercard"
      handleHover={handleMouseHover}
      onCardClick={onCardClick}
    >
      {isHovering ? (
        <Pencil className="usercard-edit-button" onClick={onPencilClick} />
      ) : (
        <div className="usercard-edit-button" />
      )}
      <Avatar src={pictureUrl} />
      <Typography className="usercard-name" variant="h2">
        {props.user.name}
      </Typography>
      <Typography className="usercard-text" variant="text">
        {props.user.description}
      </Typography>
    </Card>
  );
};

export default UserCard;
