import React from "react";

import Card from "../components/Card/Card";
import Typography from "../components/Typography/Typography";
import Avatar from "../components/Avatar/Avatar";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const DashboardView = () => {
  return (
    <div style={{ background: "#F8F8F8" }}>
      <p>Dashboard</p>
      <Card />
      <Typography variant="h1" text="H1 Source Sans Pro Light 48px" />
      <Typography variant="h2" text="H2 Header Source Sans Pro Semibold 21px" />
      <Typography variant="text" text="Parahraph Source Sans Pro Light 16px" />
      <Avatar src={process.env.PUBLIC_URL + "logo512.png"} />
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <Button variant="primary" text="Default" />
        <Button variant="primary" text="Disabled" disabled />
      </div>
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <Button variant="secondary" text="Default" />
        <Button variant="secondary" text="Disabled" disabled />
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", flexWrap: "nowrap" }}
      >
        <Input placeholder="Placeholder" />
        <Input label="Label" value="Value with Label" />
      </div>
    </div>
  );
};

export default DashboardView;
