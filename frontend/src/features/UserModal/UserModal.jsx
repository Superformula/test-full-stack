import React, { useState, useEffect } from "react";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Map from "../../components/Map/Map";
import Modal from "../../components/Modal/Modal";
import Typography from "../../components/Typography/Typography";

import "./UserModal.css";

// TODO: Add Map implementation
const UserModal = (props) => {
  const [activeUser, setActiveUser] = useState(props.user);

  const closeModal = (event) => {
    event.preventDefault();
    props.closeModal();
  };

  useEffect(() => {
    const updateActiveUser = (user) => {
      setActiveUser(user);
    };

    updateActiveUser(props.user);
    return () => {
      updateActiveUser(props.user);
    };
  }, [props.user]);

  return (
    <Modal open={props.open} closeModal={props.closeModal}>
      <Typography variant="h1">Edit User</Typography>
      <div className="usermodal-details">
        <div className="usermodal-details-left">
          <div className="usermodal-map">
            <Map address={activeUser ? activeUser.address : ""} />
          </div>
        </div>
        <div className="usermodal-details-right">
          <Input
            label="Name"
            value={activeUser ? activeUser.name : ""}
            className="userdetails-input"
          />
          <Input
            label="Address"
            value={activeUser ? activeUser.address : ""}
            className="userdetails-input"
          />
          <Input
            label="Description"
            value={activeUser ? activeUser.description : ""}
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
