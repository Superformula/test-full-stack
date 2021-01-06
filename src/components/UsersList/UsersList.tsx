import Button from "@components/Button";
import Card, { User } from "@components/Card";
import styles from "./UsersList.module.css";

interface Props {
  onListItemClicked: (user: User) => void;
  items: User[];
  onLoadMore: () => void;
}

const UsersList = ({ onListItemClicked, items, onLoadMore }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {items.map((item) => (
          <Card key={item.id} item={item} onClick={onListItemClicked} />
        ))}
      </div>
      <Button variant="primary" label="Load more" onClick={onLoadMore} />
    </div>
  );
};

export default UsersList;
