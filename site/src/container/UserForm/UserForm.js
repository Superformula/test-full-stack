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
import TestIds from "../../utils/testIds.js";

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
  }
`;

const UserFormPanelDeleteButton = styled.span`
  position: relative;
  top: 10px;
  left: 10px;
  cursor: pointer;
`;

const UserFormPanelArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  margin: 0 64px 64px;
  @media (max-width: 1023px) {
    justify-content: center;
  }
`;

const UserFormPanelImageAndMapArea = styled.div`
  flex-direction: column;
  flex-basis: 651px;
  display: flex;
  align-items: center;
  @media (max-width: 1261px) {
    flex-basis: 400px;
    .google_map {
      width: 300px !important;
      height: 300px !important;
    }
  }

  @media (max-width: 1023px) {
    flex-basis: 62px;
    .google_map {
      display: none;
      width: 300px !important;
      height: 300px !important;
    }
  }
`;

const UserFormPanelInputArea = styled.div`
  flex-direction: column;
  flex-basis: 621px;
  align-items: center;
`;

const UserFormRow = styled.div`
  width: 100%;
  padding-right: 64px;
  margin-top: 18px;
  margin-bottom: 18px;

  input[type="text"],
  input[type="date"] {
    width: 100%;
    max-width: 580px;
  }

  button {
    margin-top: 20px;
  }

  .resetButton {
    margin-left: 56px;
  }
  .danger-text {
    color: #e08181;
  }

  @media (max-width: 680px) {
    width: 80%;
    button {
      width: 150px;
    }
  }
`;

const UserForm = (props) => {
  const formRef = useRef(null);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    if (data.name === "") {
      return false;
    }
    if (data.dateOfBirth && data.dateOfBirth === "") {
      data.dateOfBirth = moment(data.dateOfBirth).utc().unix();
    } else {
      data.dateOfBirth = null;
    }
    if (props.currentUser && props.currentUser.id) {
      data.id = props.currentUser.id;
      await AppSyncUserServiceProvider.updateUser(data);
    } else {
      let item = await AppSyncUserServiceProvider.addUser(data);
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
      <UserFormPanelDeleteButton
        type="button"
        data-testid={TestIds.DeleteUserButton}
        onClick={async () => {
          await AppSyncUserServiceProvider.deleteUser(props.currentUser);
          props.onSubmitted();
        }}
      >
        <FaUserMinus>Delete</FaUserMinus>
      </UserFormPanelDeleteButton>
    );
  }

  const [mapAddress, setMapAddress] = React.useState(address);

  return (
    <UserFormPanel data-testid={TestIds.UserFormScreen}>
      <SfH1 data-testid={TestIds.UserFormScreenTitle}>
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
                data-testid={TestIds.UserNameField}
                ref={register({
                  required: true,
                })}
              />
              {errors.name && (
                <SfH2
                  data-testid={TestIds.UserNameDisplayLabelError}
                  className="danger-text"
                >
                  Name cannot be empty!
                </SfH2>
              )}
            </UserFormRow>
            <UserFormRow>
              <SfH2>Date Of Birth:</SfH2>
              <SfTextInput
                type="date"
                name="dateOfBirth"
                defaultValue={dateOfBirth}
                data-testid={TestIds.DateOfBirthField}
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
                data-testid={TestIds.UserAddressField}
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
                data-testid={TestIds.UserDescriptionField}
                ref={register({
                  required: false,
                })}
              />
            </UserFormRow>
            <UserFormRow>
              <SfButton
                type="submit"
                data-testid={TestIds.UserFormSubmitButton}
              >
                Submit
              </SfButton>
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
