import React, { useState } from "react";
import { Query } from "react-apollo";

import Input from "../components/Input/Input";
import Typography from "../components/Typography/Typography";
import UserList from "../features/UserList/UserList";
import UserModal from "../features/UserModal/UserModal";
import WatchLoader from "../components/Loader/WatchLoader";

import { listUsers } from "../graphql/queries";
import "./Dashboard.css";

const DashboardView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [areThereUsersLeft, setAreThereUsersLeft] = useState(true);

  const users = () => (
    <Query query={listUsers} variables={{ limit: 6 }}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <WatchLoader />;
        if (error) return `Error! ${error.message}`;

        return (
          <UserList
            showLoadMore={areThereUsersLeft}
            users={data.listUsers.items}
            onEditClick={onEditClick}
            onLoadMore={() => {
              fetchMore({
                query: listUsers,
                variables: { nextToken: data.listUsers.nextToken, limit: 3 },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  const previousUsers = previousResult.listUsers.items;
                  const newUsers = fetchMoreResult.listUsers.items;
                  const newCursor = fetchMoreResult.listUsers.nextToken;
                  const lastCursor = previousResult.listUsers.nextToken;
                  const allUsersSoFar = previousUsers.concat(newUsers);

                  setAreThereUsersLeft(newCursor);

                  if (lastCursor) {
                    const newListUsers = {
                      listUsers: {
                        items: allUsersSoFar,
                        nextToken: newCursor,
                        __typename: "UserConnection",
                      },
                    };
                    return newListUsers;
                  } else {
                    const allListUsers = {
                      listUsers: {
                        items: previousUsers,
                        nextToken: lastCursor,
                        __typename: "UserConnection",
                      },
                    };
                    return allListUsers;
                  }
                },
              });
            }}
          />
        );
      }}
    </Query>
  );

  const onEditClick = (user) => {
    setActiveUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <div className="dashboard">
        <div className="grid">
          <div className="top-row">
            <Typography variant="h1">Users List</Typography>
            <Input placeholder="Search..." />
          </div>
          {users()}
        </div>
      </div>
      <UserModal open={isModalOpen} closeModal={closeModal} user={activeUser} />
    </React.Fragment>
  );
};

export default DashboardView;
