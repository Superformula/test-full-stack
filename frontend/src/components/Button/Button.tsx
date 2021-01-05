import styles from "./Button.module.css";

interface Props {
  type?: "submit";
  label: string;
  variant: "primary" | "secondary";
}

const Button = (props: Props) => {
  const { type, label, variant } = props;
  return (
    <button className={`${styles.button} ${styles[variant]}`} type={type}>
      {label}
    </button>
  );
};

export default Button;
