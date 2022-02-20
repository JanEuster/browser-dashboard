import { ITheme } from "../../types";
import { Nav } from "./navbar.styles";
import ThemeButton from "./../ThemeButton/index";

const Navbar: React.FC<{ theme: ITheme }> = ({ theme }) => {
  return (
    <Nav>
      <ThemeButton theme={theme} />
    </Nav>
  );
};

export default Navbar;
