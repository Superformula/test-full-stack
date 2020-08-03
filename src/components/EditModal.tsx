import React, { Component } from "react";
import ReactModal from "react-modal";
import "../assets/App.scss";
import { UserEdit } from "../models";

ReactModal.setAppElement("#modal-root");

type EditModalProps = {
  showModal: boolean;
  handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  data: UserEdit;
};

class EditModal extends Component<EditModalProps, any> {
  constructor(props: EditModalProps) {
    super(props);
    this.state = {
      id: props.data.id,
      name: props.data.name,
      address: props.data.address,
      description: props.data.description,
    };
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.showModal}
        contentLabel="Minimal Modal Example"
        className="Edit-modal"
        overlayClassName="Edit-modal-overlay"
      >
        <h1>Edit user</h1>
        <div className="Edit-modal-container">
          <div className="Edit-modal-map">{this.state.address}</div>
          <div className="Edit-modal-form">
            <form>
              <label>Name</label>
              <input type="text" defaultValue={this.state.name}></input>
              <label>Location</label>
              <input type="text" defaultValue={this.state.address}></input>
              <label>Description</label>
              <input type="text" defaultValue={this.state.description}></input>
            </form>
            <div className="Edit-modal-actions">
              <button>Save</button>
              {/* TODO: Figure out how to trigger close prop to parent. */}
              <button onClick={this.props.handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default EditModal;
