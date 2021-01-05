import Modal from "@components/Modal";
import Form from "@components/Form";
import Head from "next/head";
import Header from "../src/components/Header/Header";
import UsersList from "../src/components/UsersList";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { User } from "@components/Card";

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
        <Header onCreateUserClick={toggleIsModalOpen} />
        <UsersList onListItemClicked={onListItemClicked} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
      <Modal isOpen={isModalOpen}>
        <Form user={user} onCancel={toggleIsModalOpen} />
      </Modal>
    </div>
  );
}
