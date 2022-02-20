import { AppProps } from "next/app";

export interface ITheme {
  theme: string;
  toggleTheme: Function;
}

export interface HomeProps {
  pageProps: AppProps;
  theme: ITheme;
}

export interface INote {
  id: number;
  title: string;
  content: string;
}