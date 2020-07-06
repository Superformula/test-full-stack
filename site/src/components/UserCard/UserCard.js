import styled from "styled-components";
import React from "react";
import moment from "moment";

const UserCardPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 300px;
  color: #cbeeff;
  height: 300px;
  margin: 10px;
  background-color: rgba(146, 146, 146, 0.3);
  border: solid 1px white;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0.97);
  }
`;

const UserCardPanelImageArea = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  width: 100%;
  height: 230px;
  img {
    box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0.97);
    border-radius: 50%;
  }
`;

const UserCardPanelInfoArea = styled.div`
  font-size: 13px;
  width: 100%;
  height: 70px;
  .nameLabel {
    font-weight: bold;
    padding: 8px;
  }
  .descriptionLabel {
    font-size: 12px;
    padding: 8px;
  }

  .createdAtLabel {
    float: right;
    padding-right: 8px;
    label {
      margin-left: 5px;
      font-weight: bold;
      color: greenyellow;
    }
  }
`;

const UserCard = (props) => {
  return (
    <UserCardPanel
      onClick={() => {
        if (props.onClick) {
          props.onClick(props.user);
        }
      }}
    >
      <UserCardPanelImageArea>
        <img alt={props.user.name} src={props.user.image} />
      </UserCardPanelImageArea>
      <UserCardPanelInfoArea>
        <div>
          <label className="nameLabel">{props.user.name}</label>
          <div className="createdAtLabel">
            Created
            <label>{moment(props.user.createdAt).format("YYYY-MM-DD")}</label>
          </div>
        </div>
        <div className="descriptionLabel">{props.user.description}</div>
      </UserCardPanelInfoArea>
    </UserCardPanel>
  );
};

export default UserCard;
