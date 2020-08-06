import React, { Component } from "react";
import ReactModal from "react-modal";
import "../assets/App.scss";
import { EditModalProps, UpdateUserQueryVariables, EditUserProps } from "../models";
import { GqlRetry, UpdateUser } from "../superformula-api";
import EditForm from "./EditForm";
import EditMap from "./EditMap";

ReactModal.setAppElement("#modal-root");

class EditModal extends Component<EditModalProps, any> {

  handleSubmit = async (editUser: EditUserProps) => {
    const variables: UpdateUserQueryVariables = {
      id: this.props.user.id,
      ...editUser,
      expectedVersion: this.props.user.version,
    };
    // TODO: Find the type for the graphql operation response
    await GqlRetry(UpdateUser, variables).then(({ data }: any) => {
      if (data) this.props.handleClose();
    });
  }

  handleCancel = () => {
    this.props.handleClose();
  }

  render() {
    return (
      <div onClick={e => e.stopPropagation()}>
        <ReactModal
          isOpen={this.props.modalIsOpen}
          contentLabel="Minimal Modal Example"
          className="Edit-modal"
          overlayClassName="Edit-modal-overlay"
        >
          <h1>Edit user</h1>
          <div className="Edit-modal-container">
            {/* TODO: Create map component */}
            <div className="Edit-modal-map">
              <EditMap address={this.props.user.address} />
              </div>
            <div className="Edit-modal-form">
              <EditForm user={this.props.user} submit={this.handleSubmit} cancel={this.handleCancel} />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default EditModal;
