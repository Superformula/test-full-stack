import Avatar from "./Avatar";
import styles from "./Card.module.css";
import { format } from "date-fns";

interface User {
  name: string;
  dob: string;
  address: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  item: User;
}
const Card = ({ item }: Props) => {
  return (
    <div className={styles.container}>
      <Avatar />
      <div className={styles.body}>
        <h2 className={styles.username}>{item.name}</h2>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.meta}>
          created <span>{format(new Date(item.createdAt), "dd MMM YYY")}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
