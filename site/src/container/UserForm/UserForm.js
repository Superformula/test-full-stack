import React, { useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import moment from "moment";
import { FaUserMinus } from "react-icons/fa";

import AppSyncUserServiceProvider from "../../provider/AppSyncUserServiceProvider.js";
import Map from "../../components/Map/Map.js";
import {
  SfButton,
  SfH1,
  SfH2,
  SfTextInput,
} from "../../styles/HtmlElementStyle.js";

const UserFormPanel = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-top: 24px;
    width: 100%;
    margin-left: 132px;
    svg {
      position: relative;
      top: 10px;
      left: 10px;
      cursor: pointer;
    }
  }
`;

const UserFormPanelArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  margin: 0 64px 64px;
`;

const UserFormPanelImageAndMapArea = styled.div`
  flex-direction: column;
  flex-basis: 50%;
  display: flex;
  align-items: center;
`;

const UserFormPanelInputArea = styled.div`
  flex-direction: column;
  flex-basis: 50%;
  align-items: center;
`;

const UserFormRow = styled.div`
  width: calc(100% - 64px);
  padding-right: 64px;
  margin-top: 18px;
  margin-bottom: 18px;

  input[type="text"],
  input[type="date"] {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  .resetButton {
    margin-left: 40px;
  }
  .danger-text {
    color: #e08181;
  }
`;

const UserForm = (props) => {
  const formRef = useRef(null);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    if (data.dateOfBirth && data.dateOfBirth === "") {
      data.dateOfBirth = moment(data.dateOfBirth).utc().unix();
    } else {
      data.dateOfBirth = null;
    }
    if (props.currentUser) {
      data.id = props.currentUser.id;
      await AppSyncUserServiceProvider.updateUser(data);
    } else {
      await AppSyncUserServiceProvider.addUser(data);
    }
    if (props.onSubmitted) {
      props.onSubmitted();
    }
  };

  let label = "Create New User";
  let name = null;
  let dateOfBirth = null;
  let address = null;
  let description = null;
  let removeButton = "";
  if (props.currentUser) {
    label = `Edit ${props.currentUser.name}`;
    name = props.currentUser.name;
    dateOfBirth = props.currentUser.dateOfBirth;
    address = props.currentUser.address;
    description = props.currentUser.description;
    removeButton = (
      <FaUserMinus
        type="button"
        onClick={async () => {
          await AppSyncUserServiceProvider.deleteUser(props.currentUser);
          props.onSubmitted();
        }}
      >
        Delete
      </FaUserMinus>
    );
  }

  const [mapAddress, setMapAddress] = React.useState(address);

  return (
    <UserFormPanel>
      <SfH1>
        {label} {removeButton}
      </SfH1>
      <UserFormPanelArea>
        <UserFormPanelImageAndMapArea>
          <Map address={mapAddress} />
        </UserFormPanelImageAndMapArea>
        <UserFormPanelInputArea>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <UserFormRow>
              <SfH2>Name:</SfH2>
              <SfTextInput
                type="text"
                name="name"
                defaultValue={name}
                ref={register({
                  required: true,
                })}
              />
              {errors.name && (
                <SfH2 className="danger-text">Name cannot be empty!</SfH2>
              )}
            </UserFormRow>
            <UserFormRow>
              <SfH2>Date Of Birth:</SfH2>
              <SfTextInput
                type="date"
                name="dateOfBirth"
                defaultValue={dateOfBirth}
                ref={register({
                  required: false,
                })}
              />
            </UserFormRow>
            <UserFormRow>
              <SfH2>Address:</SfH2>
              <SfTextInput
                type="text"
                name="address"
                defaultValue={address}
                ref={register({
                  required: false,
                })}
                onBlur={(e) => {
                  setMapAddress(e.target.value);
                }}
              />
            </UserFormRow>
            <UserFormRow>
              <SfH2>Description:</SfH2>
              <SfTextInput
                type="text"
                name="description"
                defaultValue={description}
                ref={register({
                  required: false,
                })}
              />
            </UserFormRow>
            <UserFormRow>
              <SfButton type="submit">Submit</SfButton>
              <SfButton className="resetButton" type="reset">
                Reset
              </SfButton>
            </UserFormRow>
          </form>
        </UserFormPanelInputArea>
      </UserFormPanelArea>
    </UserFormPanel>
  );
};

const UserFormMapStateToProps = function (state) {
  return {
    currentUser: state.currentEditUser,
  };
};

const UserFormContainer = connect(UserFormMapStateToProps)(UserForm);

export default UserFormContainer;
