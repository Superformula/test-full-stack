import React, { useState } from "react";
import { Query } from "react-apollo";

import Button from "../../components/Button/Button";
import Typography from "../../components/Typography/Typography";
import UserList from "../../features/UserList/UserList";
import WatchLoader from "../../components/Loader/WatchLoader";

import { listUsers } from "../../graphql/queries";
import "./LimitedUserList.css";

const LimitedUserList = (props) => {
  const [areThereUsersLeft, setAreThereUsersLeft] = useState(true);

  const onEditClick = (user) => {
    props.setActiveUser(user);
    props.setIsModalOpen(true);
  };

  return (
    <Query
      query={listUsers}
      variables={{ limit: props.limit, filter: props.filter }}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <WatchLoader />;
        if (error)
          return <Typography variant="h2">Error! ${error.message}</Typography>;

        if (data.listUsers.items.length === 0) {
          if (props.filter) {
            return (
              <div className="limited-user-list-error">
                <Typography variant="h2">
                  Sorry, no users found that match that search criteria
                </Typography>
                <Button variant="primary" onClick={props.resetFilter}>
                  Clear Search
                </Button>
              </div>
            );
          } else {
            return (
              <React.Fragment>
                <Typography variant="text">
                  Sorry, no users found at this time. Please try again later or
                  try populating your users data source.
                </Typography>
              </React.Fragment>
            );
          }
        }

        return (
          <UserList
            showLoadMore={areThereUsersLeft}
            users={data.listUsers.items}
            onEditClick={onEditClick}
            picturesList={props.picturesList}
            onLoadMore={() => {
              fetchMore({
                query: listUsers,
                variables: {
                  nextToken: data.listUsers.nextToken,
                  limit: props.limit,
                  filter: props.filter,
                },
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
                    return previousResult;
                  }
                },
              });
            }}
          />
        );
      }}
    </Query>
  );
};

export default LimitedUserList;
