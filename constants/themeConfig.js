import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#FAFAFA",
  text: "#363537",
  toggleBorder: "#FFF",
  background: "#363537",
  grey0: "#FFFFFF",
  grey1: "#F2F2F2",
  grey2: "#DBDBDB",
  grey3: "#CFCBD1",
  grey4: "#363537",
  grey5: "#212121",
  grey6: "#000000",
};

export const darkTheme = {
  body: "#1E1D1F",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  background: "#999",
  grey0: "#000000",
  grey1: "#171717",
  grey2: "#2E2E2E",
  grey3: "#3E3D40",
  grey4: "#69676B",
  grey5: "#D9D9D9",
  grey6: "#FFFFFF",
};

export const GlobalStyles = createGlobalStyle`
  :root {
  ${({ theme }) => `
    --zero: ${theme.grey0};
    --text: ${theme.text};
    --one: ${theme.grey1};
    --two: ${theme.grey2};
    --three: ${theme.grey3};
    --four: ${theme.grey4};
    --five: ${theme.grey5};
    --six: ${theme.grey6};
  `}
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Roboto black;
    transition: all 1s linear;
  }
`;
