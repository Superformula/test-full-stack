import React, { Component } from "react";
import "./assets/App.scss";
import Amplify, { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
// import _ from "lodash";
import SearchInput from "./components/SearchInput";
import LoadMoreButton from "./components/LoadMoreButton";
import Card from "./components/Card";
import aws_exports from "./aws-exports";
import { User } from "./models";
Amplify.configure(aws_exports);
Amplify.Logger.LOG_LEVEL = "INFO";

const ListUsers = `
query ListUsers {
    listUsers(limit: 6) {
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Users List</h1>
          <SearchInput />
        </header>
        <div className="App-content">
          <div className="Card-list">
            <Connect query={graphqlOperation(ListUsers)}>

              {/* {({ data, loading }) => { */}
              {(response: any) => {
                console.log(response)
                if (response.loading || response.data === undefined || response.data === null || Card === undefined) return []
                const data = response.data.listUsers.items;                
                return (
                  data.map((user: User, index: any) => <Card key={index} user={{
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    address: user.address,
                    description: user.description,
                    createdAt: user.createdAt,
                  }} />)
                )
              }}
            </Connect>
          </div>
          <LoadMoreButton />
        </div>
        <div id="main"></div>
      </div>
    );
  }
}

export default App;
