import React, { Component } from "react";
import ReactModal from "react-modal";
import "../assets/App.scss";
import { EditModalProps } from "../models";
import EditForm from "./EditForm";
import EditMap from "./EditMap";

class EditModal extends Component<EditModalProps, any> {
  componentDidMount() {
    ReactModal.setAppElement("#modal-root");
  }

  handleCancel = () => {
    this.props.handleClose();
  };

  render() {
    return (
      <div onClick={e => e.stopPropagation()}>
      <div onClick={(e) => e.stopPropagation()}>
        <ReactModal
          isOpen={this.props.modalIsOpen}
          contentLabel="Minimal Modal Example"
          className="Edit-modal"
          overlayClassName="Edit-modal-overlay"
          ariaHideApp={false}
        >
          <h1>Edit user</h1>
          <div className="Edit-modal-container">
            <div className="Edit-modal-map">
              <EditMap
                latitude={this.props.user.latitude}
                longitude={this.props.user.longitude}
              />
            </div>
            <div className="Edit-modal-form">
              <EditForm user={this.props.user} cancel={this.handleCancel} />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default EditModal;
