import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import styles from "../styles/Home.module.css";
import { WeatherDataCurrent } from "../types";

const Home: NextPage<{ theme: string }> = ({ theme }) => {
  const router = useRouter();


  useEffect(() => {
    // function to refresh the server-side rendered props 
    const refreshData = () => {
      router.replace(router.asPath);
    }
    const refreshInterval = setInterval(refreshData, 60 * 1000);

    return () => clearInterval(refreshInterval)
  }, [])



  return (
    <div className={styles.container}>
      <Head>
        <title>browser-dashboard</title>
        <meta name="description" content="browser-dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Dashboard />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};



export async function getServerSideProps({ }): Promise<{ props: {} }> {

  return {
    props: {
    },

  }
}

export default Home;
