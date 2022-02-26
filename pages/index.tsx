import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { AppContainer, AppContainerVH, SpacerV, SpacerH, HStack, VStack, HStack100, VStack100 } from "../components/common";
import { NotesApp, WeatherSummaryApp, WebLinksApp } from "../components/Dashboard";
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
        <VStack100>
          <HStack100>
            <VStack width="350px" shrink={0} >
              <NotesApp basis={250} shrink={1} />
              <SpacerV />
              <WeatherSummaryApp currentWeather={currentWeather} />
            </VStack>

            <SpacerH />

            <VStack width="200px" shrink={0} >
              <WebLinksApp />
              <SpacerV />
              <AppContainerVH />
            </VStack>

            <SpacerH />

            <VStack width="1000px" shrink={0}>
              <AppContainerVH />
              <SpacerV />
              <AppContainerVH />
            </VStack>

            <SpacerH />

            <AppContainer width={400} shrink={0.1} />
            <SpacerH />
            <AppContainer width={600} shrink={0.1} />

          </HStack100>
        </VStack100>
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
