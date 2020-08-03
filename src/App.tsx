import React, { Component } from "react";
import "./assets/App.scss";
import Amplify, { graphqlOperation, API } from "aws-amplify";
import retry from "async-retry";
// import _ from "lodash";
import SearchInput from "./components/SearchInput";
import Card from "./components/Card";
import aws_exports from "./aws-exports";
import { User } from "./models";
Amplify.configure(aws_exports);
Amplify.Logger.LOG_LEVEL = "INFO";

const ListUsers = `
query ListUsers($limit: Int, $nextToken: String) {
    listUsers(limit: $limit, nextToken: $nextToken) {
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
      console.log("Sending GraphQL operation", {
        query: query,
        vars: variables,
      });
      const response = await API.graphql(graphqlOperation(query, variables));
      console.log("GraphQL result", {
        result: response,
        query: query,
        vars: variables,
      });
      return response;
    },
    {
      retries: 10,
    }
  );
};

class App extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      nextToken: "",
      users: [],
    };
  }

  async componentDidMount() {
    this.getUsers();
}

  setNextToken = (token: String) => {
    if (token) this.setState({ nextToken: token });
  };

  handleAddUsers = (givenUsersList: any[]) => {
    const usersList = this.state.users.concat(givenUsersList);
    this.setState({ users: usersList });
  };

  getUsers = async () => {
    // TODO: Find the type for the graphql operation response
    await GqlRetry(ListUsers, { limit: 6 }).then(({data}: any) => {
      this.setState({ users: data.listUsers.items });
      this.setState({ nextToken: data.listUsers.nextToken });
    });
  };

  getNextUsers = async () => {
    // TODO: Integrate with getUsers to keep DRY
    await GqlRetry(ListUsers, { limit: 6, nextToken: this.state.nextToken }).then(({data}: any) => {
      this.handleAddUsers(data.listUsers.items);
      this.setState({ nextToken: data.listUsers.nextToken });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Users List</h1>
          <SearchInput />
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
          <div className="Load-more-button-container">
            { this.state.nextToken ? <button onClick={this.getNextUsers}>Load More...</button> : null }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
