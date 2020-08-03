import React from "react";

import "./Typography.css";

const Typography = (props) => {
  // TODO: Validate props.variant is one of: h1,h2,text
  return (
    <div className={"typography-" + props.variant + " " + props.className}>
      {props.children}
    </div>
  );
};

export default Typography;
