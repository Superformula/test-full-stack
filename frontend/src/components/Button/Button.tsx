import styles from "./Button.module.css";

interface Props {
  type?: "submit";
  label: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
}

const Button = (props: Props) => {
  const { type, label, variant, onClick } = props;
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
