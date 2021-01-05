import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Card, { User } from "@components/Card";
import styles from "./UsersList.module.css";

import { listUsers } from "../../../graphql/queries";

interface Props {
  onListItemClicked: (user: User) => void;
}

const UsersList = ({ onListItemClicked }: Props) => {
  const { loading, error, data } = useQuery(gql(listUsers));
  console.log({ loading, error, data });

  if (data) {
    const {
      listUsers: { items },
    } = data;
    return (
      <div className={styles.grid}>
        {items.map((item) => (
          <Card key={item.id} item={item} onClick={onListItemClicked} />
        ))}
      </div>
    );
  }

  return null;
};

export default UsersList;
