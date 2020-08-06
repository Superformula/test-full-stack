import React, { Component } from "react";
import _ from "lodash";
import { EditFormProps, UpdateUserQueryVariables } from "../models";
import { GqlRetry, UpdateUser } from "../superformula-api";

class EditForm extends Component<EditFormProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: this.props.user.name,
      address: this.props.user.address,
      description: this.props.user.description,
      latitude: null,
      longitude: null,
    };
  }

  submit = async (event: React.FormEvent) => {
    const variables: UpdateUserQueryVariables = {
      id: this.props.user.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      expectedVersion: this.props.user.version,
    };
    await GqlRetry(UpdateUser, variables);
  };

  updateText = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ [e.target.name]: e.target.value });

  handleAddress = _.debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.address}.json?limit=2&access_token=pk.eyJ1Ijoic3RlaW5rbGF0cmUiLCJhIjoiY2tkajEzb2tjMGFnNDMybzB6YnJoOWV3ZSJ9.IKb0brXr269EUis2xTsh4w`
    )
    console.log(data)
  }, 200);

  render() {
    return (
      <form onSubmit={this.submit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          defaultValue={this.state.name}
          onChange={this.updateText}
        ></input>
        <label>Location</label>
        <input
          type="text"
          name="address"
          defaultValue={this.state.address}
          onChange={this.handleAddress}
        ></input>
        <label>Description</label>
        <input
          type="text"
          name="description"
          defaultValue={this.state.description}
          onChange={this.updateText}
        ></input>
        <div className="Edit-modal-actions">
          <button type="submit" disabled={this.state.isLoading}>
            Save
          </button>
          <button onClick={this.props.cancel}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default EditForm;
