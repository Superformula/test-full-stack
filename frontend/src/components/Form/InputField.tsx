import { forwardRef } from "react";
import Input from "./Input";
import styles from "./InputField.module.css";

interface Props {
  name?: string;
  placeholder?: string;
}

const InputField = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { name, placeholder } = props;
  return (
    <div className={styles.field}>
      <label>{name}</label>
      <Input ref={ref} name={name} placeholder={placeholder} />
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
