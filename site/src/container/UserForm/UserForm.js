import React, { useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import moment from "moment";

import AppSyncUserServiceProvider from "../../provider/AppSyncUserServiceProvider.js";

const UserFormPanel = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }
`;

const UserFormPanelImageAndMapArea = styled.div`
  flex-direction: column;
  flex-basis: 400px;
  align-items: center;
`;

const UserFormPanelInputArea = styled.div`
  flex-direction: column;
  flex-basis: 400px;
  align-items: center;
`;

const UserFormRow = styled.div`
  width: 95%;
  margin-top: 10px;
  margin-bottom: 10px;

  textarea,
  input[type="text"],
  input[type="date"] {
    width: 99%;
    height: 26px;
    padding: 2px 2px 2px 2px;
    border: solid 1px #cecece;
  }

  textarea {
    height: 80px;
    resize: none;
  }

  label {
    font-weight: bold;
    font-size: 15px;
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
      <button
        onClick={async () => {
          await AppSyncUserServiceProvider.deleteUser(props.currentUser);
          if (props.onSubmitted) {
            props.onSubmitted();
          }
        }}
      >
        Delete
      </button>
    );
  }

  return (
    <UserFormPanel>
      <h1>
        {label} {removeButton}
      </h1>

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <UserFormPanelImageAndMapArea></UserFormPanelImageAndMapArea>
        <UserFormPanelInputArea>
          <UserFormRow>
            <label>Name:</label>
            <br />
            <input
              type="text"
              name="name"
              defaultValue={name}
              ref={register({
                required: true,
              })}
            />
            {errors.name && (
              <span className="danger-text">Name cannot be empty!</span>
            )}
          </UserFormRow>
          <UserFormRow>
            <label>Date Of Birth:</label>
            <br />
            <input
              type="date"
              name="dateOfBirth"
              defaultValue={dateOfBirth}
              ref={register({
                required: false,
              })}
            />
          </UserFormRow>
          <UserFormRow>
            <label>Address:</label>
            <br />
            <input
              type="text"
              name="address"
              defaultValue={address}
              ref={register({
                required: false,
              })}
            />
          </UserFormRow>
          <UserFormRow>
            <label>Description:</label>
            <br />
            <textarea
              name="description"
              defaultValue={description}
              ref={register({
                required: false,
              })}
            />
          </UserFormRow>
          <UserFormRow>
            <input type="submit" value="Submit" />
            <input type="reset" />
          </UserFormRow>
        </UserFormPanelInputArea>
      </form>
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
