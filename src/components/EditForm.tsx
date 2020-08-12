import React, { Component } from "react";
import { EditFormProps, UpdateUserQueryVariables } from "../models";
import { GqlRetry, UpdateUser } from "../superformula-api";
import Geocode from "react-geocode";

const google_api = "AIzaSyA99xjNkzuidYfQOTeY8GEkeNkiFNZ_t_g";

class EditForm extends Component<EditFormProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: this.props.user.name,
      address: this.props.user.address,
      latitude: this.props.user.latitude,
      longitude: this.props.user.longitude,
      description: this.props.user.description,
    };
  }

  submit = async (event: React.FormEvent) => {
    // event.preventDefault();
    const variables: UpdateUserQueryVariables = {
      id: this.props.user.id,
      name: this.state.name,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      description: this.state.description,
      expectedVersion: this.props.user.version,
    };
    console.log(variables);
    await GqlRetry(UpdateUser, variables);
  };

  updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddress = async (e: React.ChangeEvent<HTMLInputElement>) => {
    Geocode.setApiKey(google_api);
    if (e.target.value !== "") {
      await Geocode.fromAddress(e.target.value).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          if (lat && lng) {
            this.setState({ latitude: lat, longitude: lng });
          }
        },
        (error) => {
          console.warn(`Geocode API query error: ${error}`);
        }
      );
    }
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          defaultValue={this.state.name}
          onInput={this.updateText}
        ></input>
        <label>Location</label>
        <input
          type="text"
          name="address"
          defaultValue={this.state.address}
          onInput={this.updateText}
          onChange={this.handleAddress}
        ></input>
        <label>Description</label>
        <input
          type="text"
          name="description"
          defaultValue={this.state.description}
          onInput={this.updateText}
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
