import { forwardRef } from "react";
import style from "./Input.module.css";

interface Props {
  name?: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { name, placeholder } = props;
  return (
    <input
      className={style.input}
      name={name}
      ref={ref}
      placeholder={placeholder}
    />
  );
});

Input.displayName = "Input";

export default Input;
