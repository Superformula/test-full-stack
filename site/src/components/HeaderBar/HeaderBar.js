import React, { useState } from "react";
import * as Fa from "react-icons/fa";
import styled from "styled-components";

import AppSyncUserServiceProvider from "../../provider/AppSyncUserServiceProvider.js";

const HeaderArea = styled.div`
  display: flex;
  background-color: #092232;
  border-bottom: solid 1px #1b646d;
  position: fixed;
  flex-direction: row;
  width: 100%;
  height: 81px;
  align-items: center;
  z-index: 1;
  button {
    float: right;
    margin-right: 20px;
  }
  div.area {
    width: 33%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .logoArea {
    img {
      margin-left: 20px;
    }
  }
  .searchArea {
    justify-content: center;
    input[type="textbox"] {
      width: 80%;
    }
  }
  .buttonArea {
    flex-direction: row-reverse;
    button {
      margin-right: 20px;
    }
  }
`;

const HeaderBar = (props) => {
  const [searchText, setSearchText] = useState("");
  return (
    <HeaderArea>
      <div className="area logoArea">
        <img
          alt="logo"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyOCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41ODE3IDEuOTY5NjJlLTA1SDI2LjQ3OTdDMjYuNzUxOSAxLjk2OTYyZS0wNSAyNi45OTc0IDAuMTY0MDQyIDI3LjEwMTYgMC40MTU2MDRDMjcuMjA1OCAwLjY2NzE2NiAyNy4xNDgyIDAuOTU2NzI2IDI2Ljk1NTcgMS4xNDkyNkwxNC4yNDk3IDEzLjg1NTNWMjQuODU0NEwyNi4wMDM2IDEzLjEwMDRDMjYuMTk2MiAxMi45MDc5IDI2LjQ4NTcgMTIuODUwMyAyNi43MzczIDEyLjk1NDVDMjYuOTg4OCAxMy4wNTg3IDI3LjE1MjkgMTMuMzA0MiAyNy4xNTI5IDEzLjU3NjRWMjYuNDE4M0MyNy4xNTI5IDI2LjQyMTcgMjcuMTUyOSAyNi40MjUxIDI3LjE1MjkgMjYuNDI4NlYyNi40Nzk3QzI3LjE1MjkgMjYuNzQ4OSAyNi45OTQ4IDI2Ljk4MTMgMjYuNzY2MyAyNy4wODlMMTQuMDUzMyAzOS44MDJDMTMuOTM4MiAzOS45MTc1IDEzLjc4MTMgMzkuOTkxNSAxMy42MDcyIDM5Ljk5OTNDMTMuNTk1MiAzOS45OTk4IDEzLjU4MzIgNDAuMDAwMSAxMy41NzEyIDQwSDAuNjczMjMxQzAuNDAwOTQyIDQwIDAuMTU1NDY1IDM5LjgzNiAwLjA1MTI2NDkgMzkuNTg0NEMtMC4wNTI5MzU1IDM5LjMzMjggMC4wMDQ2NjE2MiAzOS4wNDMzIDAuMTk3MTk5IDM4Ljg1MDdMMTIuNTk2MyAyNi40NTE2TDAuMjAwNzM3IDE0LjA1NkMwLjE2ODM3OCAxNC4wMjQxIDAuMTM5MTA2IDEzLjk4ODkgMC4xMTM1MTkgMTMuOTUwNkMwLjA3OTM3NTUgMTMuODk5NSAwLjA1MjY4OTkgMTMuODQ0NCAwLjAzMzc5NTUgMTMuNzg3QzAuMDExMDc0NCAxMy43MTgxIC0xLjU1MTE5ZS0wNSAxMy42NDcgMS42Mjg0MWUtMDggMTMuNTc2NEMyLjkxNDc2ZS0wNSAxMy40NDQyIDAuMDM5MDIwNSAxMy4zMTM3IDAuMTEzNTE5IDEzLjIwMjNDMC4xMzkxMDYgMTMuMTY0IDAuMTY4Mzc4IDEzLjEyODcgMC4yMDA3MzcgMTMuMDk2OUwxMy4xMDA0IDAuMTk3MTk5QzEzLjExMjQgMC4xODUxNjUgMTMuMTI0OSAwLjE3MzY1OSAxMy4xMzc2IDAuMTYyNjg2QzEzLjI1MzQgMC4wNjMxNDQ4IDEzLjM5NzYgMC4wMDc1MjE1MiAxMy41NDU3IDAuMDAwNzExMDEzQzEzLjU1NzcgMC4wMDAxNTg4NTcgMTMuNTY5NyAtNy4yNDUxN2UtMDUgMTMuNTgxNyAxLjk2OTYyZS0wNVpNMTIuOTAzMiAxMi45MDMyVjIuMjk4NTFMMi4yOTg1MSAxMi45MDMySDEyLjkwMzJaTTE0LjI0OTcgMTEuOTUxMkwyNC44NTQ0IDEuMzQ2NDRIMTQuMjQ5N1YxMS45NTEyWk0xMi45MDMyIDI4LjA0ODhWMzguNjUzNkgyLjI5ODUxTDEyLjkwMzIgMjguMDQ4OFpNMTUuMjU3OCAyNS43NTAzSDI1LjgwNjRWMTUuMjAxN0wxNS4yNTc4IDI1Ljc1MDNaTTI0Ljc5ODMgMjcuMTUyOUwxNC4yNDk3IDM3LjcwMTVWMjcuMTUyOUgyNC43OTgzWk0xMi45MDMyIDE0LjI0OTdIMi4yOTg1MUwxMi45MDMyIDI0Ljg1NDRWMTQuMjQ5N1oiIGZpbGw9IiNGRkZFRjkiLz4KPC9zdmc+Cg=="
        />
      </div>
      <div className="area searchArea">
        <input
          type="textbox"
          defaultValue={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              return AppSyncUserServiceProvider.doSearch(searchText);
            }
          }}
        />
        <button
          onClick={async () => {
            return AppSyncUserServiceProvider.doSearch(searchText);
          }}
        >
          Search
        </button>
      </div>
      <div className="area buttonArea">
        <button
          onClick={() => {
            props.onNewUserClick(null);
          }}
        >
          <Fa.FaUserPlus /> New User
        </button>
      </div>
    </HeaderArea>
  );
};

export default HeaderBar;
