import { gql, useMutation } from "@apollo/client";
import Button from "@components/Button";
import { User } from "@components/Card";
import { updateUser as updateUserMutation } from "@graphql/mutations";
import { createUser as createUserMutation } from "@graphql/mutations";
import { useForm } from "react-hook-form";
import styles from "./Form.module.css";
import Input from "./Input";

interface Props {
  onCancel?: () => void;
  user?: User;
}

const Form = ({ onCancel, user }: Props) => {
  const { register, handleSubmit /* errors */ } = useForm();
  const [updateUser] = useMutation(gql(updateUserMutation));
  const [createUser] = useMutation(gql(createUserMutation));
  const onSubmit = (data) => {
    if (user) {
      return updateUser({
        variables: {
          input: { id: user.id, ...data, updatedAt: new Date().toISOString() },
        },
      })
        .then((result) => {
          console.log(result);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input ref={register} name="name" defaultValue={user && user.name} />
      <Input
        ref={register}
        name="address"
        defaultValue={user && user.address}
      />
      <Input
        ref={register}
        name="description"
        defaultValue={user && user.description}
      />
      <div className={styles.actions}>
        <Button type="submit" label="Save" variant="primary" />
        <Button
          type="submit"
          label="Cancel"
          variant="secondary"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export default Form;
