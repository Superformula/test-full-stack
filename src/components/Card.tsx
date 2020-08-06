import React, { Component } from "react";
import "../assets/App.scss";
import _ from "lodash";
import editIcon from "../assets/edit-icon.svg";
import { User, CardProps, QueryVariables, QueryVariablesWithFilter } from "../models";
import { ListUsers, GqlRetry } from "../superformula-api";
import SearchInput from "./SearchInput";

class Card extends Component<CardProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: null,
      nextToken: null,
      searchValue: null,
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const variables: QueryVariables = {
      limit: 6,
    };

    await GqlRetry(ListUsers, variables).then(({ data }: any) => {
      if (data) {
        this.setState({ nextToken: data.listUsers.nextToken});
        this.setState({ users: data.listUsers.items });
      };
    });
  }

  handleCardClick = (user: User) => this.props.propagateUser(user);

  renderCards = (data: User[]) => {
    if (data === null) return [];
    return [
      data.map((user: User) => (
        <div
          className="Card"
          key={user.id}
          onClick={() => this.handleCardClick(user)}
        >
          <img
            className="Card-edit-button"
            src={editIcon}
            alt="Edit User Icon"
          />
          <div className="Card-image">
            <img src={user.avatar.toString()} alt="User Name Avatar" />
          </div>
          <div className="Card-title">
            <h3>{user.name}</h3>
            <div className="Card-date">
              created{" "}
              <span>
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="Card-description">
            <p>{user.description}</p>
          </div>
        </div>
      )),
    ];
  };

  getNextUsers = async () => {
    const variables: QueryVariables = {
      limit: 6,
      nextToken: this.state.nextToken,
    };

    await GqlRetry(ListUsers, variables)
      .then(({ data }: any) => {
        this.setState({ nextToken: data.listUsers.nextToken });
        this.setState({ users: _.concat(this.state.users, data.listUsers.items) })
      });
  };

  handleNameSearch = _.debounce(async (givenSearchText: String) => {
    const variables: QueryVariablesWithFilter = {
      limit: 6,
      filter: {
        name: {
          contains: givenSearchText,
        },
      },
    };

    if (givenSearchText === "" || givenSearchText === null) this.getUsers();
    
    this.setState({ nextToken: null });

    await GqlRetry(ListUsers, variables).then(({ data }: any) => {
      this.setState({ nextToke: data.listUsers.nextToken });
      this.setState({ users: data.listUsers.items });
    });
    
  }, 500);

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>Users List</h1>
          <SearchInput handleNameSearch={this.handleNameSearch} />
        </header>
        <div className="Card-list">
          { this.state.users?.length ? this.renderCards(this.state.users) : <p>No results found</p> }
        </div>
        <div className="Load-more-button-container">
          { this.state.nextToken ? <button onClick={this.getNextUsers}>
            Load More...
          </button> : null }
        </div>
      </div>
    );
  }
}

export default Card;
