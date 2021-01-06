import { CSSProperties } from "react";
import styles from "./Button.module.css";

interface Props {
  type?: "submit";
  label: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
  style?: CSSProperties;
}

const Button = (props: Props) => {
  const { type, label, variant, onClick, style } = props;
  return (
    <button
      style={style}
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
};

export default Button;
