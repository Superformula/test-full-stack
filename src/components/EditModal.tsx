import React, { Component } from "react";
import ReactModal from "react-modal";
import "../assets/App.scss";
import { EditModalProps } from "../models";

ReactModal.setAppElement("#modal-root");

class EditModal extends Component<EditModalProps, any> {
  constructor(props: EditModalProps) {
    super(props);
    this.state = {
      id: props.user.id,
      name: props.user.name,
      address: props.user.address,
      description: props.user.description,
    };
  }

  render() {
    return (
      <div onClick={e => e.stopPropagation()}>
        <ReactModal
          isOpen={this.props.modalIsOpen}
          contentLabel="Minimal Modal Example"
          className="Edit-modal"
          overlayClassName="Edit-modal-overlay"
          onRequestClose={this.state.handleClose}
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
                <button onClick={this.props.handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default EditModal;
