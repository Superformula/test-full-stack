import Button from "@components/Button";
import Input from "@components/Form/Input";
import styles from "./Header.module.css";

interface Props {
  onCreateUserClick: () => void;
  onSearchChange: (text: string) => void;
}

const Header = ({ onCreateUserClick, onSearchChange }: Props) => {
  return (
    <div className={styles.container}>
      <h1>Users list</h1>
      <div className={styles.actions}>
        <Button
          variant="primary"
          label="Create user"
          onClick={onCreateUserClick}
        />
        <Input placeholder="Search..." onChange={onSearchChange} />
      </div>
    </div>
  );
};

export default Header;
