import Button from "@components/Button";
import { useForm } from "react-hook-form";
import styles from "./Form.module.css";
import Input from "./Input";

const Form = () => {
  const { register, handleSubmit /* errors */ } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input ref={register} name="name" defaultValue="" />
      <Input ref={register} name="address" defaultValue="" />
      <Input ref={register} name="description" defaultValue="" />
      <div className={styles.actions}>
        <Button type="submit" label="Save" variant="primary" />
        <Button type="submit" label="Cancel" variant="secondary" />
      </div>
    </form>
  );
};

export default Form;
