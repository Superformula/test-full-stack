import React, { Component } from "react";
import "../assets/App.scss";
import _ from "lodash";
import editIcon from "../assets/edit-icon.svg";
import { User, CardProps } from "../models";
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from "aws-amplify";
import { ListUsers, SubscribeToUsers } from "../superformula-api";

class Card extends Component<CardProps, any> {

  handleCardClick = (user: User) => this.props.propagateUser(user);;

  renderCards = (data: any) => {
    if (data.listUsers.items.length === 0) return []
    return [
      data.listUsers.items.map((user: User) => (
        <div className="Card" key={user.id} onClick={() => this.handleCardClick(user)}>
          <img className="Card-edit-button" src={editIcon} alt="Edit User Icon" />
          <div className="Card-image">
            <img src={user.avatar.toString()} alt="User Name Avatar" />
          </div>
          <div className="Card-title">
            <h3>{user.name}</h3>
            <div className="Card-date">
              created <span>{
                new Date(user.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }</span>
            </div>
          </div>
          <div className="Card-description">
            <p>{user.description}</p>
          </div>
        </div>
      ))
    ]
  }

  render() {
    return (
      <Connect
          query={graphqlOperation(ListUsers, { limit: 6 })}
          subscription={graphqlOperation(SubscribeToUsers)}
          onSubscriptionMsg={(response) => console.log(response)}
          // @ts-ignore
          // onSubscriptionMsg={(prev: any, data: any) => {
          //     console.log("User Updated:", {prev: prev, newData: data} );
          //     prev.listUsers.items = _.concat(prev.listUsers.items, [{
          //       id: data.onUpdateUser.id,
          //       name: data.onUpdateUser.name,
          //       avatar: data.onUpdateUser.avatar,
          //       address: data.onUpdateUser.address,
          //       description: data.onUpdateUser.description,
          //       createdAt: data.onUpdateUser.createdAt,
          //       version: data.onUpdateUser.version,
          //   }])
          //     return prev
          // }}
          >
              {(response: any) => {
                  if (response.loading || response.data === undefined || response.data === null || response.data.listUsers === undefined) return []
                  return (
                    <div className="Card-list">
                      {this.renderCards(response.data)}
                    </div>
                  ) 
              }
              }
          </Connect>
    );
  }
}

export default Card;
