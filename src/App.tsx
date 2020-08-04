import React, { Component } from "react";
import "./assets/App.scss";
import Amplify, { graphqlOperation, API } from "aws-amplify";
import retry from "async-retry";
import _ from "lodash";
import SearchInput from "./components/SearchInput";
import Card from "./components/Card";
import aws_exports from "./aws-exports";
import { User, QueryVariables, QueryVariablesWithFilter } from "./models";
Amplify.configure(aws_exports);
Amplify.Logger.LOG_LEVEL = "INFO";

const ListUsers = `
query ListUsers($limit: Int, $nextToken: String, $filter: ModelUserFilterInput) {
    listUsers(limit: $limit, nextToken: $nextToken, filter: $filter) {
        nextToken
        items {
          id
          name
          avatar
          address
          description
          createdAt
        }
    }
}`;

const GqlRetry = async (query: any, variables?: any) => {
  return await retry(
    async () => {
      return await API.graphql(graphqlOperation(query, variables));
    },
    {
      retries: 10,
    }
  );
};

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      nextToken: "",
      users: [],
      searchValue: "",
    };
  }

  async componentDidMount() {
    this.getUsers();
  }

  setNextToken = (token: String) => {
    if (token) this.setState({ nextToken: token });
  };

  handleAddUsers = (givenUsersList: User[]) => {
    const usersList = this.state.users.concat(givenUsersList);
    this.setState({ users: usersList });
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

    // Totally not DRY :(
    await GqlRetry(ListUsers, variables).then(({ data }: any) => {
      this.setState({ users: data.listUsers.items });
      this.setState({ nextToken: data.listUsers.nextToken });
    });
  }, 500);

  getNextUser = () => {
    if (this.state.nextToken) this.getUsers(this.state.nextToken);
  };

  getUsers = async (givenToken?: String) => {
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
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Users List</h1>
          <SearchInput handleNameSearch={this.handleNameSearch} />
        </header>
        <div className="App-content">
          <div className="Card-list">
            {this.state.users.map((user: User, index: any) => (
              <Card
                key={index}
                user={{
                  id: user.id,
                  name: user.name,
                  avatar: user.avatar,
                  address: user.address,
                  description: user.description,
                  createdAt: user.createdAt,
                }}
              />
            ))}
          </div>
          <div className="No-Results">
            {!this.state.users.length ? (
              <h4>No results found. Note: The search is case sensitive.</h4>
            ) : null}
          </div>
          <div className="Load-more-button-container">
            {this.state.nextToken && this.state.users.length ? (
              <button onClick={this.getNextUser}>Load More...</button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
