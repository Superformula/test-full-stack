import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Card from "@components/Card";
import { listUsers } from "../../../graphql/queries";

const UsersList = () => {
  const { loading, error, data } = useQuery(gql(listUsers));
  console.log({ loading, error, data });

  if (data) {
    const {
      listUsers: { items },
    } = data;
    return (
      <div>
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    );
  }

  return null;
};

export default UsersList;
