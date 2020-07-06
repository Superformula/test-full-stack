import React, { useState } from "react";
import * as Fa from "react-icons/fa";
import Modal from "styled-react-modal";
import styled from "styled-components";

import UserFormContainer from "./UserForm.js";

const UserFormStyledModal = Modal.styled`
  width: 800px;
  height: 530px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition: opacity ease 500ms;
`;

const UserFormStyledModalToolBar = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  svg {
    padding-right: 10px;
    cursor: pointer;
  }
`;

const UserFormModal = (props) => {
  const [opacity, setOpacity] = useState(0);

  let afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 10);
  };

  let beforeClose = () => {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 200);
    });
  };

  return (
    <UserFormStyledModal
      isOpen={props.isOpen}
      afterOpen={afterOpen}
      beforeClose={beforeClose}
      onBackgroundClick={props.closeModal}
      onEscapeKeydown={props.closeModal}
      opacity={opacity}
      backgroundProps={{ opacity }}
    >
      <UserFormStyledModalToolBar>
        <Fa.FaWindowClose onClick={props.closeModal} />
      </UserFormStyledModalToolBar>
      <UserFormContainer onSubmitted={props.closeModal} />
    </UserFormStyledModal>
  );
};

export default UserFormModal;
