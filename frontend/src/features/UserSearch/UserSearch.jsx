import React from "react";
import Input from "../../components/Input/Input";

// TODO: Confirm with end user/product owner which field(s) filtering happens on. Using user name for now
const UserSearch = (props) => {
  return (
    <Input
      placeholder="Search By Name..."
      onChange={props.onSearch}
      value={props.filter}
    />
  );
};

export default UserSearch;
