import React from "react";
import { ITheme } from "../../types";
import { Button, Circle } from "./themebutton.styles";

const ThemeButton: React.FC<{ theme: ITheme }> = ({ theme }) => {
  let active = theme.theme === "light" ? false : true;
  return (
    <Button onClick={() => theme.toggleTheme()} active={active}>
      <Circle active={active} />
    </Button>
  );
};

export default ThemeButton;
