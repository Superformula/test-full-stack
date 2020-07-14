import styled from "styled-components";
import dayjs from "dayjs";
import React, { memo } from "react";
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

const UserEditButton = styled.span`
  cursor: pointer;
  position: absolute;
  right: 23px;
  top: 18px;
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
  ${SfH2} {
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CreatedAtLabelArea = styled.div`
  float: right;
  font-size: 16px;
  padding-top: 5px;
  ${SfP} {
    display: inline;
  }
`;

const DateLabel = styled(SfP)`
  margin-left: 5px;
  font-weight: normal;
  color: #b42320;
`;

const DescriptionLabel = styled(SfP)`
  padding-top: 8px;
  font-weight: 300;
  font-size: 16px;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserCard = ({ user, onClick }) => {
  return (
    <UserCardPanel data-testid={TestIds.UserCard}>
      <UserEditButton
        data-testid={TestIds.EditUserButton}
        onClick={() => {
          if (onClick) {
            onClick(user);
          }
        }}
      >
        <SfPenIcon />
      </UserEditButton>
      <UserCardPanelImageArea>
        <img alt={user.name} src={user.image} />
      </UserCardPanelImageArea>
      <UserCardPanelInfoArea>
        <div>
          <SfH2 data-testid={TestIds.UserNameDisplayLabel}>{user.name}</SfH2>
          <CreatedAtLabelArea data-testid={TestIds.UserNameDisplayLabel}>
            <SfP>created</SfP>
            <DateLabel>{dayjs(user.createdAt).format("DD MMM YYYY")}</DateLabel>
          </CreatedAtLabelArea>
        </div>
        <DescriptionLabel data-testid={TestIds.UserDescriptionLabel}>
          {user.description}
        </DescriptionLabel>
      </UserCardPanelInfoArea>
    </UserCardPanel>
  );
};

export default memo(UserCard);
