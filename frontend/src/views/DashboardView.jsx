import React from "react";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import UserCard from "../features/UserCard/UserCard";
import Typography from "../components/Typography/Typography";

import "./Dashboard.css";

const DashboardView = () => {
  return (
    <div className="dashboard">
      <div className="grid">
        <div className="top-row">
          <Typography variant="h1">Users List</Typography>
          <Input placeholder="Search..." />
        </div>

        <div className="middle-row">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>

        <div className="bottom-row">
          <Button variant="primary" text="Load More" />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
