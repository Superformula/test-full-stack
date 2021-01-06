import { forwardRef } from "react";
import style from "./Input.module.css";

interface Props {
  name?: string;
  placeholder?: string;
  onChange?: (text: string) => void;
}

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { name, placeholder, onChange } = props;
  return (
    <input
      className={style.input}
      name={name}
      ref={ref}
      placeholder={placeholder}
      onChange={(event) => {
        if (onChange) {
          onChange(event.target.value);
        }
      }}
    />
  );
});

Input.displayName = "Input";

export default Input;
