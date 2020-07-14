import React, { memo } from "react";
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

const UserFormModal = ({ isOpen, opacity, closeModal }) => {
  return (
    <UserFormStyledModal
      isOpen={isOpen}
      opacity={opacity}
      backgroundProps={opacity}
    >
      <span className="closeButton">
        <FaWindowClose onClick={closeModal} />
      </span>
      <UserFormContainer onSubmitted={closeModal} />
    </UserFormStyledModal>
  );
};

export default memo(UserFormModal);
