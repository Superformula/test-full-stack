import React from "react";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import Typography from "../../components/Typography/Typography";

import "./UserModal.css";

const UserModal = (props) => {
  console.log(props);

  const closeModal = (event) => {
    event.preventDefault();
    props.closeModal();
  };

  return (
    <Modal open={props.open} closeModal={props.closeModal}>
      <Typography variant="h1">Edit User</Typography>
      <div className="usermodal-details">
        <div className="usermodal-details-left">
          <div className="usermodal-map">map</div>
        </div>
        <div className="usermodal-details-right">
          <Input
            label="Name"
            value={props.name}
            className="userdetails-input"
          />
          <Input
            label="Address"
            value={props.address}
            className="userdetails-input"
          />
          <Input
            label="Description"
            value={props.description}
            className="userdetails-input"
          />
          <div className="usermodal-buttons">
            <Button variant="primary">Save</Button>
            <Button variant="Secondary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
