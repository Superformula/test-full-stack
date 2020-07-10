import styled from "styled-components";
import React from "react";
import moment from "moment/min/moment.min.js";
import { SfH2, SfP } from "../../styles/HtmlElementStyle.js";
import { SfPenIcon } from "../../utils/SfIcons.js";

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
  svg {
    cursor: pointer;
    position: absolute;
    right: 23px;
    top: 18px;
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
  }
  .descriptionLabel {
    padding-top: 8px;
    font-weight: 300;
    font-size: 16px;
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

const UserCard = (props) => {
  return (
    <UserCardPanel>
      <SfPenIcon
        onClick={() => {
          if (props.onClick) {
            props.onClick(props.user);
          }
        }}
      />
      <UserCardPanelImageArea>
        <img alt={props.user.name} src={props.user.image} />
      </UserCardPanelImageArea>
      <UserCardPanelInfoArea>
        <div>
          <SfH2 className="nameLabel">{props.user.name}</SfH2>
          <div className="createdAtLabel">
            <SfP> Created</SfP>
            <label>{moment(props.user.createdAt).format("YYYY-MM-DD")}</label>
          </div>
        </div>
        <div className="descriptionLabel">{props.user.description}</div>
      </UserCardPanelInfoArea>
    </UserCardPanel>
  );
};

export default UserCard;
