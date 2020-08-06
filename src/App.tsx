import React, { Component } from "react";
import "./assets/App.scss";
import Amplify from "aws-amplify";
import _ from "lodash";
import SearchInput from "./components/SearchInput";
import Card from "./components/Card";
import aws_exports from "./aws-exports";
import { User, QueryVariables, QueryVariablesWithFilter } from "./models";
import { GqlRetry, ListUsers } from "./superformula-api";
import EditModal from "./components/EditModal";
Amplify.configure(aws_exports);
Amplify.Logger.LOG_LEVEL = "INFO";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeUser: null,
      modalIsOpen: false,
      nextToken: "",
      users: [],
      searchValue: "",
    };
  }

  setNextToken = (token: String) => {
    if (token) this.setState({ nextToken: token });
  };

  handleAddUsers = (givenUsersList: User[]) => {
    const usersList = this.state.users.concat(givenUsersList);
    this.setState({ users: usersList });
  };

  handleNameSearch = _.debounce(async (givenSearchText: String) => {
    this.setState({ isLoading: true });
    const variables: QueryVariablesWithFilter = {
      limit: 6,
      filter: {
        name: {
          contains: givenSearchText,
        },
      },
    };

    // Totally not DRY :(
    await GqlRetry(ListUsers, variables).then(({ data }: any) => {
      this.setState({ users: data.listUsers.items });
      this.setState({ nextToken: data.listUsers.nextToken });
    });
    this.setState({ isLoading: false });
  }, 500);

  getNextUser = () => {
    if (this.state.nextToken) this.getUsers(this.state.nextToken);
  };

  getUsers = async (givenToken?: String) => {
    this.setState({ isLoading: true });
    const variables: QueryVariables = {
      limit: 6,
    };

    if (givenToken) variables.nextToken = givenToken;

    // TODO: Find the type for the graphql operation response
    await GqlRetry(ListUsers, variables).then(({ data }: any) => {
      if (!givenToken) this.setState({ users: data.listUsers.items });
      if (givenToken) this.handleAddUsers(data.listUsers.items);
      this.setState({ nextToken: data.listUsers.nextToken });
    });
    this.setState({ isLoading: false });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  setActiveUser = (user: User) => {
    this.setState({activeUser: user});
    this.openModal();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Users List</h1>
          <SearchInput handleNameSearch={this.handleNameSearch} />
        </header>
        <div className="App-content">
          <Card 
            activeUser={this.state.activeUser}
            propagateUser={this.setActiveUser} />
          { this.state.activeUser ? <EditModal
            modalIsOpen={this.state.modalIsOpen}
            handleClose={this.closeModal}
            user={this.state.activeUser}
          /> : null }
          <div className="Loader">
            {this.state.isLoading ? <h4>Loading...</h4> : null}
          </div>
          <div className="No-Results">
            {!this.state.isLoading && !this.state.users.length ? (
              <h4>No results found. Note: The search is case sensitive.</h4>
            ) : null}
          </div>
          <div className="Load-more-button-container">
            {/* {this.state.nextToken && this.state.users.length ? ( */}
              <button onClick={this.getNextUser}>Load More...</button>
            {/* ) : null} */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
