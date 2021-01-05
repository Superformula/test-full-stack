import { forwardRef } from "react";
import styles from "./Input.module.css";

interface Props {
  name: string;
  defaultValue: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { name, defaultValue } = props;
  return (
    <div className={styles.field}>
      <label>{name}</label>
      <input name={name} defaultValue={defaultValue} ref={ref} />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
