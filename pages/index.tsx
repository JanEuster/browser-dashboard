import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { AppContainer, AppContainerVH, SpacerV, SpacerH, HStack, VStack, HStack100, VStack100 } from "../components/common";
import Dashboard, { NotesApp, WeatherSummaryApp, WebLinksApp } from "../components/Dashboard";
import styles from "../styles/Home.module.css";
import { HomeProps } from "../types";
import ThemeButton from "./../components/ThemeButton/index";

const Home: NextPage<> = ({ theme, currentWeather }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>browser-dashboard</title>
        <meta name="description" content="browser-dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Dashboard currentWeather={currentWeather} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};



export async function getServerSideProps({ }) {
  // get current weather data
  let weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=52.51637&lon=13.37849&appid=${process.env.OPENWEATHER_APP_ID}&units=metric`);
  let weatherData = await weatherRes.json();
  // set weatherData city because the openweathermap api city is jsut the location name of the weather station
  let locationRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=52.51637&lon=13.37849`);
  let locationData = await locationRes.json()
  // weatherData.name = `${weatherData.name}, ${locationData.address.borough}, ${locationData.address.city}, ${locationData.address.country}`
  weatherData.name = `${locationData.address.city}, ${locationData.address.country}`



  return {
    props: {
      currentWeather: weatherData,
    },

  }
}

export default Home;
