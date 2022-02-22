import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../constants/themeConfig";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // load theme on first render of page
  useEffect(() => {
    try {
      let theme = localStorage.getItem("theme")
      if (theme === "light" || theme === "dark") {
        setTheme(theme)
      }
      console.log("load saved theme");
    } catch(err) {
      console.log("no theme to load");
    }
  }, []);
  // save theme on change
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme])

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar theme={{ theme, toggleTheme: toggleTheme }} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
