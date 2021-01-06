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

export default function Home() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const toggleIsModalOpen = () => {
    setUser(null);
    setModalIsOpen(!isModalOpen);
  };
  const onListItemClicked = (user: User) => {
    toggleIsModalOpen();
    setUser(user);
  };

  const { loading, error, data, refetch } = useQuery(gql(listUsers));

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
            refetch({ filter: { name: { contains: text } } });
          }}
        />
        <UsersList
          onListItemClicked={onListItemClicked}
          items={loading ? [] : data.listUsers.items}
        />
      </main>
      <Modal isOpen={isModalOpen}>
        <Form user={user} onCancel={toggleIsModalOpen} />
      </Modal>
    </div>
  );
}
