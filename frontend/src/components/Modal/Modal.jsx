import React from "react";

import "./Modal.css";

const Modal = (props) => {
  return (
    <div
      className={"modal " + (props.open ? "modal-visible" : "modal-invisible")}
    >
      <div className="modal-content">{props.children}</div>
    </div>
  );
};

export default Modal;
