import React, { Component } from "react";
import _ from "lodash";
import { EditFormProps } from "../models";

class EditForm extends Component<EditFormProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: this.props.user.name,
      address: this.props.user.address,
      description: this.props.user.description,
    };
  }

  submit = (event: React.FormEvent) => {
    this.props.submit(this.state);
    event.preventDefault();
  };

  updateText = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ [e.target.name]: e.target.value });

  handleAddress = _.debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    const geocodeLookup = await fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/Washington.json?limit=2&access_token=pk.eyJ1Ijoic3RlaW5rbGF0cmUiLCJhIjoiY2tkajEzb2tjMGFnNDMybzB6YnJoOWV3ZSJ9.IKb0brXr269EUis2xTsh4w"
    );
    console.log(geocodeLookup);
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
