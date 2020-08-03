import React, { useState } from "react";
import { Query } from "react-apollo";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import UserCard from "../features/UserCard/UserCard";
import UserModal from "../features/UserModal/UserModal";
import Typography from "../components/Typography/Typography";

import { listUsers } from "../graphql/queries";
import "./Dashboard.css";

const DashboardView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  const users = () => (
    <Query query={listUsers}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <div className="middle-row">
            {data.listUsers.items.map((user) => {
              return (
                <UserCard
                  key={user.id}
                  onPencilClick={onEditClick}
                  user={user}
                />
              );
            })}
          </div>
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
