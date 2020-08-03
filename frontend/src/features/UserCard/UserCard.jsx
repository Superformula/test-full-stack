import React from "react";

import Avatar from "../../components/Avatar/Avatar";
import Card from "../../components/Card/Card";
import Pencil from "../../icons/Pencil";
import Typography from "../../components/Typography/Typography";

import "./UserCard.css";

// TODO: show edit button and user createdAt onHover only
const UserCard = (props) => {
  const onPencilClick = (event) => {
    props.onPencilClick(props.user);
  };

  return (
    <Card className="usercard">
      <Pencil className="usercard-edit-button" onClick={onPencilClick} />
      <Avatar src={process.env.PUBLIC_URL + "logo512.png"} />
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
