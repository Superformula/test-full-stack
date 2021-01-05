import styles from "./Modal.module.css";

interface Props {
  children: React.ReactNode;
}
const Modal = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
