import Modal from "@components/Modal";
import Form from "@components/Form";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import Header from "../src/components/Header/Header";
import UsersList from "../src/components/UsersList";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { User } from "@components/Card";
import { listUsers } from "@graphql/queries";
import console from "console";

const PAGE_LIMIT = 6;
export default function Home() {
  console.log("Test CI");
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchText, setSearchText] = useState("");

  const toggleIsModalOpen = () => {
    setUser(null);
    setModalIsOpen(!isModalOpen);
  };
  const onListItemClicked = (user: User) => {
    toggleIsModalOpen();
    setUser(user);
  };

  const { loading, data, refetch, fetchMore } = useQuery(gql(listUsers), {
    variables: { limit: PAGE_LIMIT, filter: null },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>User Management</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/SourceSansPro/SourceSansPro-Light.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/SourceSansPro/SourceSansPro-Semibold.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/SourceSansPro/SourceSansPro-Regular.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>

      <main className={styles.main}>
        <Header
          onCreateUserClick={toggleIsModalOpen}
          onSearchChange={(text) => {
            setSearchText(text);
            refetch({
              limit: PAGE_LIMIT,
              filter: { name: { contains: text } },
            });
          }}
        />
        <UsersList
          onListItemClicked={onListItemClicked}
          items={loading ? [] : data.listUsers.items}
          onLoadMore={() => {
            if (!data.listUsers.nextToken) {
              return;
            }

            fetchMore({
              variables: {
                limit: PAGE_LIMIT,
                nextToken: data.listUsers.nextToken,
                filter: searchText ? { name: { contains: searchText } } : null,
              },
            });
          }}
        />
      </main>
      <Modal isOpen={isModalOpen}>
        <Form
          user={user}
          onCancel={toggleIsModalOpen}
          onSuccess={toggleIsModalOpen}
        />
      </Modal>
    </div>
  );
}
