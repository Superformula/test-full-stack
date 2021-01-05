import Button from "@components/Button";
import Input from "@components/Form/Input";
import styles from "./Header.module.css";

interface Props {
  onCreateUserClick: () => void;
}

const Header = ({ onCreateUserClick }: Props) => {
  return (
    <div className={styles.container}>
      <h1>Users list</h1>
      <div className={styles.actions}>
        <Button
          style={{ marginRight: "1rem" }}
          variant="primary"
          label="Create user"
          onClick={onCreateUserClick}
        />
        <Input placeholder="Search..." />
      </div>
    </div>
  );
};

export default Header;
