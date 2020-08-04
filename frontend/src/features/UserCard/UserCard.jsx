import React from "react";

import Avatar from "../../components/Avatar/Avatar";
import Card from "../../components/Card/Card";
import Pencil from "../../icons/Pencil";
import Typography from "../../components/Typography/Typography";

import { getRandomInt } from "../../utilities/getRandomInt";
import "./UserCard.css";

// TODO: show edit button and user createdAt onHover only
const UserCard = (props) => {
  // Consistently show the same picture for users across loads through modulo operation
  const pictureUrl =
    props.picturesList.results[props.user.createdAt % 23].urls.small;

  const onPencilClick = (event) => {
    props.onPencilClick(props.user);
  };

  return (
    <Card className="usercard">
      <Pencil className="usercard-edit-button" onClick={onPencilClick} />
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
