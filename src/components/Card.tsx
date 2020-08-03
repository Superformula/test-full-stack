import React, { Component } from "react";
import "../assets/App.scss";

import editIcon from "../assets/edit-icon.svg";
import EditModal from "./EditModal";
import { User } from "../models";

type CardProps = {
  key: Number;
  user: User;
};

class Card extends Component<CardProps, any> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      showModal: false,
      createdAt: new Date(props.user.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
  }

  closeModal = () => this.setState({ showModal: false });
  openModal = () => this.setState({ showModal: true });

  render() {
    return (
      <div className="Card" onClick={this.openModal}>
        <img className="Card-edit-button" src={editIcon} alt="Edit User Icon" />
        <div className="Card-image">
          <img src={this.props.user.avatar.toString()} alt="User Name Avatar" />
        </div>
        <div className="Card-title">
          <h3>{this.props.user.name}</h3>
          <div className="Card-date">
            created <span>{this.state.createdAt}</span>
          </div>
        </div>
        <div className="Card-description">
          <p>{this.props.user.description}</p>
        </div>
        <EditModal
          showModal={this.state.showModal}
          handleClose={this.closeModal}
          data={{
            id: this.props.user.id,
            name: this.props.user.name,
            address: this.props.user.address,
            description: this.props.user.description,
          }}
        />
      </div>
    );
  }
}

export default Card;
