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


// type of current weather json api response
// https://openweathermap.org/current
export type WeatherDataCurrent = {
  coord: {
    lon: number,
    lat: number,
  },
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string,
    },
  ],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
  },
  visibiility: number,
  wind: {
    speed: number,
    deg: number,
  },
  clouds: {
    all: number,
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number,
  },
  timezone: number,
  id: number,
  name: number,
  cod: number,
}