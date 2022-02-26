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

export interface IFlex {
  basis?: number; 
  shrink?: number; 
  grow?: number;
}

export interface IFlexW {
  width: string;
  basis?: number;
  shrink?: number;
  grow?: number;
}

export interface IFlexH {
  height: string;
  basis?: number;
  shrink?: number;
  grow?: number;
}

export interface IFlexWH {
  width?: number;
  height?: number;
  basis?: number;
  shrink?: number;
  grow?: number;
}