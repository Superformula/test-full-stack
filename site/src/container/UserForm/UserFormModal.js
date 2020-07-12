import React from "react";
import { FaWindowClose } from "react-icons/fa";
import Modal from "styled-react-modal";

import UserFormContainer from "./UserForm.js";

const UserFormStyledModal = Modal.styled`
  width: 1328px;
  height: 725px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;    
  background-color: #F8F8F8;
  opacity: ${(props) => props.opacity};
  transition: opacity ease 500ms;
  position: relative;
  .closeButton {
    padding-right: 10px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 20px;
  }
`;

const UserFormModal = (props) => {
  return (
    <UserFormStyledModal
      isOpen={props.isOpen}
      afterOpen={props.afterOpen}
      beforeClose={props.beforeClose}
      opacity={props.opacity}
      backgroundProps={props.opacity}
    >
      <span className="closeButton">
        <FaWindowClose onClick={props.closeModal} />
      </span>
      <UserFormContainer onSubmitted={props.closeModal} />
    </UserFormStyledModal>
  );
};

export default UserFormModal;
