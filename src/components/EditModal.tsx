import React, { Component } from "react";
import ReactModal from "react-modal";
import "../assets/App.scss";
import { EditModalProps, UpdateUserQueryVariables } from "../models";
import _ from "lodash";
import { GqlRetry, UpdateUser } from "../superformula-api";

ReactModal.setAppElement("#modal-root");

class EditModal extends Component<EditModalProps, any> {
  constructor(props: EditModalProps) {
    super(props);
    this.state = {
      isLoading: false,
      name: props.user.name,
      address: props.user.address,
      description: props.user.description,
    };
  }

  handleNameChange = _.debounce((givenName: String) => { 
    this.setState({ name: givenName });
  }, 100)

  handleAddressChange = _.debounce((givenAddress: String) => {
    this.setState({ address: givenAddress });
  }, 100)

  handleDescriptionChange = _.debounce((givenDescription: String) => {
    this.setState({ description: givenDescription });
  }, 100)

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.saveUser();
  }

  saveUser = async () => {
    this.setState({ isLoading: true });
    const variables: UpdateUserQueryVariables = {
      id: this.props.user.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      expectedVersion: this.props.user.version,
    };
    // TODO: Find the type for the graphql operation response
    await GqlRetry(UpdateUser, variables).then(({ data }: any) => {
      if (data) this.props.handleClose();
    });
    this.setState({ isLoading: false });
  };

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
            <div className="Edit-modal-map">{this.state.address}</div>
            <div className="Edit-modal-form">
              <form onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input type="text" defaultValue={this.state.name} onInput={(event: React.ChangeEvent<HTMLInputElement>) => this.handleNameChange(event.target.value)}></input>
                <label>Location</label>
                <input type="text" defaultValue={this.state.address} onInput={(event: React.ChangeEvent<HTMLInputElement>) => this.handleAddressChange(event.target.value)}></input>
                <label>Description</label>
                <input type="text" defaultValue={this.state.description} onInput={(event: React.ChangeEvent<HTMLInputElement>) => this.handleDescriptionChange(event.target.value)}></input>
              
                <div className="Edit-modal-actions">
                  <button type="submit" disabled={this.state.isLoading}>Save</button>
                  <button onClick={this.props.handleClose}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default EditModal;
