import React, { useState } from "react";

import Typography from "../components/Typography/Typography";
import UserSearch from "../features/UserSearch/UserSearch";
import UserModal from "../features/UserModal/UserModal";
import LimitedUserList from "../features/UserQueries/LimitedUserList";

import "./Dashboard.css";

const DashboardView = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [wasFilterCleared, setWasFilterCleared] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSearch = (search) => {
    setWasFilterCleared(false);
    const searchObj = {
      name: {
        contains: search,
      },
    };
    setSearchFilter(searchObj);
  };

  const resetFilter = () => {
    setSearchFilter(null);
    setWasFilterCleared(true);
  };

  // TODO: Clean up filtering after discussing desired behavior with product owner
  return (
    <React.Fragment>
      <div className="dashboard">
        <div className="grid">
          <div className="top-row">
            <Typography variant="h1">Users List</Typography>
            <UserSearch
              onSearch={onSearch}
              filter={wasFilterCleared ? "clear" : null}
            />
          </div>
          {searchFilter && searchFilter.name.contains.length > 0 ? (
            <LimitedUserList
              key="filtered-user-list"
              setActiveUser={setActiveUser}
              setIsModalOpen={setIsModalOpen}
              limit={12}
              filter={searchFilter}
              resetFilter={resetFilter}
              picturesList={props.picturesList}
            />
          ) : (
            <LimitedUserList
              key="non-filtered-user-list"
              setActiveUser={setActiveUser}
              setIsModalOpen={setIsModalOpen}
              limit={6}
              picturesList={props.picturesList}
            />
          )}
        </div>
      </div>
      <UserModal open={isModalOpen} closeModal={closeModal} user={activeUser} />
    </React.Fragment>
  );
};

export default DashboardView;
