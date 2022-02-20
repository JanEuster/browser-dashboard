import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../constants/themeConfig";
import { useState } from "react";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar theme={{ theme, toggleTheme: toggleTheme }} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
