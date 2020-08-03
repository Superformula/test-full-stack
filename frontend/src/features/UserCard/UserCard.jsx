import React from "react";

import Avatar from "../../components/Avatar/Avatar";
import Card from "../../components/Card/Card";
import Typography from "../../components/Typography/Typography";

import "./UserCard.css";

const UserCard = (props) => {
  return (
    <Card className="usercard">
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
