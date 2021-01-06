import styles from "./Modal.module.css";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}
const Modal = ({ children, isOpen }: Props) => {
  return (
    <div
      className={styles.container}
      style={!isOpen ? { display: "none" } : null}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
