import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const About: NextPage = () => {
  return (
    <h1 className={styles.title}>
      About this <Link href="/">App</Link>
    </h1>
  );
};

export default About;
