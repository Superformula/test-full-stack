import React, { useState } from "react";
import { Query } from "react-apollo";

import Button from "../components/Button/Button";
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

  const users = () => (
    <Query query={listUsers} variables={{ limit: 6 }}>
      {({ loading, error, data }) => {
        if (loading) return <WatchLoader />;
        if (error) return `Error! ${error.message}`;

        return (
          <UserList
            users={data.listUsers.items}
            token={data.listUsers.nextToken}
            onEditClick={onEditClick}
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

          <div className="middle-row">{users()}</div>

          <div className="bottom-row">
            <Button variant="primary">Load More</Button>
          </div>
        </div>
      </div>
      <UserModal open={isModalOpen} closeModal={closeModal} user={activeUser} />
    </React.Fragment>
  );
};

export default DashboardView;
