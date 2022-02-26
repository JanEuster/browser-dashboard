import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { AppContainer, AppContainerVH, SpacerV, SpacerH, HStack, VStack, HStack100, VStack100 } from "../components/Globals";
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
            <VStack width="375px" shrink={0} >
              <NotesApp shrink={1}/>
              <SpacerV />
              <AppContainerVH />
            </VStack>
            <SpacerH />
            <VStack width="200px" shrink={0} >
              <WebLinks />
              <SpacerV />
              <AppContainerVH />
            </VStack>
            <SpacerH />
            <AppContainer width={200} shrink={0.1} />
              <SpacerH />
            <AppContainer width={200} shrink={0.1} />
          </HStack100>
        </VStack100>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
