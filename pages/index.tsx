import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { HStack, VStack, HStack100, VStack100 } from "../components/Globals";
import NotesApp from "../components/Notes";
import WebLinks from "../components/WebLinks";
import styles from "../styles/Home.module.css";
import { HomeProps } from "../types";
import ThemeButton from "./../components/ThemeButton/index";

const Home: NextPage<HomeProps> = ({ theme }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>browser-dashboard</title>
        <meta name="description" content="browser-dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <VStack100>
          <HStack100>
            <NotesApp />
            <WebLinks />
          </HStack100>
        </VStack100>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
