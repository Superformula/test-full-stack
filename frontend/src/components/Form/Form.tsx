import { gql, useMutation } from "@apollo/client";
import Button from "@components/Button";
import { User } from "@components/Card";
import { updateUser as updateUserMutation } from "@graphql/mutations";
import { createUser as createUserMutation } from "@graphql/mutations";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./Form.module.css";
import InputField from "./InputField";

interface Props {
  onCancel?: () => void;
  onSuccess?: () => void;
  user?: User;
}

const Form = ({ onCancel, user, onSuccess }: Props) => {
  const { register, handleSubmit, reset /* errors */ } = useForm({
    defaultValues: user || {},
  });
  const [updateUser] = useMutation(gql(updateUserMutation));
  const [createUser] = useMutation(gql(createUserMutation));
  const onSubmit = (data) => {
    if (user) {
      return updateUser({
        variables: {
          input: { id: user.id, ...data, updatedAt: new Date().toISOString() },
        },
      })
        .then(() => {
          onSuccess();
        })
        .catch((error) => console.error(error));
    }

    return createUser({
      variables: { input: { ...data, createdAt: new Date().toISOString() } },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const defaults = user ? { ...user } : {};
    reset(defaults);
  }, [user, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{user ? "Edit user" : "Create user"}</h1>
      <InputField ref={register} name="name" />
      <InputField ref={register} name="address" />
      <InputField ref={register} name="description" />
      <div className={styles.actions}>
        <Button type="submit" label="Save" variant="primary" />
        <Button label="Cancel" variant="secondary" onClick={onCancel} />
      </div>
    </form>
  );
};

export default Form;
