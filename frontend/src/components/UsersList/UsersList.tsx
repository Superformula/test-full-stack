import Card, { User } from "@components/Card";
import styles from "./UsersList.module.css";

interface Props {
  onListItemClicked: (user: User) => void;
  items: User[];
}

const UsersList = ({ onListItemClicked, items }: Props) => {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <Card key={item.id} item={item} onClick={onListItemClicked} />
      ))}
    </div>
  );
};

export default UsersList;
