import React from "react";

import "./Avatar.css";

const Avatar = (props) => {
  return <img className="avatar" src={props.src} alt="An User" />;
};

export default Avatar;
