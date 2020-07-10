import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import styled from "styled-components";
import { debounce } from "debounce";

import AppSyncUserServiceProvider from "../../provider/AppSyncUserServiceProvider.js";
import { SfH1, SfP, SfTextInput } from "../../styles/HtmlElementStyle";

const HeaderArea = styled.div`
  display: flex;
  padding: 183px 268px 64px;
  background-color: #f8f8f8;
  flex-direction: row;
  align-items: center;
  z-index: 1;

  div.area {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .titleArea {
    h1 {
      margin-left: 16px;
    }

    p {
      margin-left: 30px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  .searchArea {
    flex-direction: row-reverse;
    input {
      margin-right: 16px;
    }
  }
`;

let debounceFn = null;

const HeaderBar = (props) => {
  return (
    <HeaderArea>
      <div className="area titleArea">
        <SfH1>Users List</SfH1>

        <SfP
          onClick={() => {
            props.onNewUserClick(null);
          }}
        >
          <FaUserPlus /> &nbsp;&nbsp;New User
        </SfP>
      </div>
      <div className="area searchArea">
        <SfTextInput
          type="textbox"
          placeholder="Search..."
          onChange={async (e) => {
            let value = e.target.value;
            if (debounceFn) {
              debounceFn.clear();
            }
            debounceFn = debounce(async () => {
              return AppSyncUserServiceProvider.doSearch(value);
            }, 1000);
            debounceFn();
          }}
        />
      </div>
    </HeaderArea>
  );
};

export default HeaderBar;
