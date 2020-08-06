import React, { Component } from 'react';
import _ from 'lodash';
import { EditFormProps } from '../models';

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
  }

  updateText = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.submit}>
        <label>Name</label>
        <input type="text" name="name" defaultValue={this.state.name} onChange={this.updateText}></input>
        <label>Location</label>
        <input type="text" name="address" defaultValue={this.state.address} onChange={this.updateText}></input>
        <label>Description</label>
        <input type="text" name="description" defaultValue={this.state.description} onChange={this.updateText}></input>
        <div className="Edit-modal-actions">
          <button type="submit" disabled={this.state.isLoading}>Save</button>
          <button onClick={this.props.cancel}>Cancel</button>
        </div>
      </form>
    )
  }
}

export default EditForm;