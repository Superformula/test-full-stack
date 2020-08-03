import React, { useState } from "react";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import UserCard from "../features/UserCard/UserCard";
import UserModal from "../features/UserModal/UserModal";
import Typography from "../components/Typography/Typography";

import "./Dashboard.css";

const DashboardView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onEditClick = () => {
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

          <div className="middle-row">
            <UserCard onPencilClick={onEditClick} />
            <UserCard onPencilClick={onEditClick} />
            <UserCard onPencilClick={onEditClick} />
            <UserCard onPencilClick={onEditClick} />
            <UserCard onPencilClick={onEditClick} />
            <UserCard onPencilClick={onEditClick} />
          </div>

          <div className="bottom-row">
            <Button variant="primary">Load More</Button>
          </div>
        </div>
      </div>
      <UserModal open={isModalOpen} closeModal={closeModal} />
    </React.Fragment>
  );
};

export default DashboardView;
