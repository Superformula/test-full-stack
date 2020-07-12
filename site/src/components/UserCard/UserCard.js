import styled from "styled-components";
import dayjs from "dayjs";
import React from "react";
import { SfH2, SfP } from "../../styles/HtmlElementStyle.js";
import { SfPenIcon } from "../../utils/SfIcons.js";
import TestIds from "../../utils/testIds.js";

const UserCardPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-basis: 400px;
  background-color: white;
  height: 336px;
  margin: 32px;
  border-radius: 8px;
  :hover {
    box-shadow: 0 6px 9px 2px #e4e4e4;
  }
`;

const UserCardPanelImageArea = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  width: 100%;
  height: 243px;
  img {
    border-radius: 50%;
    width: 168px;
    height: 168px;
  }
`;

const UserCardPanelInfoArea = styled.div`
  font-size: 21px;
  height: 70px;
  margin-left: 32px;
  margin-right: 32px;
  .nameLabel {
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .descriptionLabel {
    padding-top: 8px;
    font-weight: 300;
    font-size: 16px;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .createdAtLabel {
    float: right;
    font-size: 16px;
    padding-top: 5px;
    p {
      display: inline;
    }
    label {
      margin-left: 5px;
      color: #b42320;
    }
  }
`;

const UserEditButton = styled.span`
  cursor: pointer;
  position: absolute;
  right: 23px;
  top: 18px;
`;

const UserCard = (props) => {
  return (
    <UserCardPanel data-testid={TestIds.UserCard}>
      <UserEditButton
        data-testid={TestIds.EditUserButton}
        onClick={() => {
          if (props.onClick) {
            props.onClick(props.user);
          }
        }}
      >
        <SfPenIcon />
      </UserEditButton>
      <UserCardPanelImageArea>
        <img alt={props.user.name} src={props.user.image} />
      </UserCardPanelImageArea>
      <UserCardPanelInfoArea>
        <div>
          <SfH2
            className="nameLabel"
            data-testid={TestIds.UserNameDisplayLabel}
          >
            {props.user.name}
          </SfH2>
          <div
            className="createdAtLabel"
            data-testid={TestIds.UserNameDisplayLabel}
          >
            <SfP> Created</SfP>
            <label>{dayjs(props.user.createdAt).format("DD MMM YYYY")}</label>
          </div>
        </div>
        <div
          className="descriptionLabel"
          data-testid={TestIds.UserDescriptionLabel}
        >
          {props.user.description}
        </div>
      </UserCardPanelInfoArea>
    </UserCardPanel>
  );
};

export default UserCard;
