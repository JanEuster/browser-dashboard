import { ITheme } from "../../types";
import { Nav } from "./navbar.styles";
import ThemeButton from "./../ThemeButton/index";
import styles from "../../styles/Home.module.css";

const Navbar: React.FC<{ theme: ITheme }> = ({ theme }) => {
  return (
    <Nav>
      <span className={styles.title}>
      <a >
        browser-dashboard
      </a>
      </span>
      <ThemeButton theme={theme} />
    </Nav>
  );
};

export default Navbar;
