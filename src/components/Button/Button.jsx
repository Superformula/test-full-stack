import React from "react";

import "./Button.css";

const Button = (props) => {
  // TODO: Validate props.variant is one of: primary,secondary

  return (
    <button
      className={"button button-" + props.variant}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
