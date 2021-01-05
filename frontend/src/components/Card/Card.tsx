import Avatar from "./Avatar";
import styles from "./Card.module.css";
import { format } from "date-fns";
import { useState } from "react";

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
  const [isMouseOver, setIsMouseOver] = useState(false);

  const toggleIsMouseOver = () => {
    setIsMouseOver(!isMouseOver);
  };

  return (
    <div
      className={styles.container}
      onMouseOver={toggleIsMouseOver}
      onMouseOut={toggleIsMouseOver}
    >
      {isMouseOver ? (
        <img className={styles.icon} src="/icons/edit.svg" />
      ) : null}
      <Avatar />
      <div className={styles.body}>
        <h2 className={styles.username}>{item.name}</h2>
        <p className={styles.description}>{item.description}</p>
        {isMouseOver ? (
          <div className={styles.meta}>
            created{" "}
            <span>{format(new Date(item.createdAt), "dd MMM YYY")}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
