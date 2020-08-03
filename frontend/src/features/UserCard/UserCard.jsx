import React from "react";

import Avatar from "../../components/Avatar/Avatar";
import Card from "../../components/Card/Card";
import Pencil from "../../icons/Pencil";
import Typography from "../../components/Typography/Typography";

import "./UserCard.css";

// TODO: show edit button and user createdAt onHover only
const UserCard = (props) => {
  return (
    <Card className="usercard">
      <Pencil className="usercard-edit-button" onClick={props.onPencilClick} />
      <Avatar src={process.env.PUBLIC_URL + "logo512.png"} />
      <Typography className="usercard-name" variant="h2">
        User Name
      </Typography>
      <Typography className="usercard-text" variant="text">
        Lorem ipsum dolor sit amet, consectetur…
      </Typography>
    </Card>
  );
};

export default UserCard;
