import React from "react";

import "./Card.css";

const Card = (props) => {
  return (
    <div
      className={"card " + props.className}
      onMouseEnter={props.handleHover}
      onMouseLeave={props.handleHover}
      onClick={props.onCardClick}
    >
      {props.children}
    </div>
  );
};

export default Card;
