import { Cloud, CloudFog, CloudLightning, CloudMoon, CloudRain, CloudSnow, Drop, DropHalf, Moon, MoonStars, Sun, SunDim, Tray, Wind, Rainbow, ThermometerCold, ThermometerHot, SunHorizon, Flame, Gradient, FunnelSimple, CloudSun } from "phosphor-react";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { AppContainerVH, CustomIcon, HL, Rotate, VL, VStack } from "../../common";
import { CenteredDiv, ConditionDesc, InfoBox, InfoBoxElement, InfoBoxRow, LocationText, LocationTextWrapper, SetAPIKey, TempMinMax, TempMinMaxText, TempText, WeatherHeader } from "./weather.styles";
import { format } from "date-fns";
import { AdditionalWeather, additionalWeather, WeatherDataCurrent, WeatherProp } from "../../../types";

const WindArrow: React.FC<{ size: number }> = ({ size }) => { return <CustomIcon size={size}><svg viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000"><g fill="var(--six)"><path d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"></path><path d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"></path></g></svg></CustomIcon> }

const ICON_SIZE = 76;


const determineWeatherMainIcon = (weatherMain: string, isDaylight: boolean, cloudyness: number): ReactElement<any, any> => {
  // determine main icons of the WeatherData.weather[0].main variations
  // based on: https://openweathermap.org/weather-conditions
  switch (weatherMain) {
    // clear group
    case "clear":
      return isDaylight ? <Sun size={ICON_SIZE} weight="bold" /> : <Moon size={ICON_SIZE} weight="bold" />;

    // clouds group
    case "clouds":
      if (cloudyness > 50) {
        // if cloud coverage > 50% show fulll cloud
        return <Cloud size={ICON_SIZE} weight="bold" />
      } else {
        // otherwise sun or moon peek through clouds
        return isDaylight ? <CloudSun size={ICON_SIZE} weight="bold" /> : <CloudMoon size={ICON_SIZE} weight="bold" />;
      }

    // atmosphere group
    case "mist":
      return <CloudFog size={ICON_SIZE} weight="bold" />
    case "smoke":
      return <CloudFog size={ICON_SIZE} weight="bold" />
    case "haze":
      return <CloudFog size={ICON_SIZE} weight="bold" />
    case "dust":
      return <CloudFog size={ICON_SIZE} weight="bold" />
    case "fog":
      return <Gradient size={ICON_SIZE} weight="bold" />
    case "sand":
      return <CloudFog size={ICON_SIZE} weight="bold" />
    case "ash":
      return <Flame size={ICON_SIZE} weight="bold" />
    case "squall":
      return <Wind size={ICON_SIZE} weight="bold" />
    case "tornado":
      return <FunnelSimple size={ICON_SIZE} weight="bold" />

    // snow group
    case "snow":
      return <CloudSnow size={ICON_SIZE} weight="bold" />

    // rain group
    case "rain":
      return <CloudRain size={ICON_SIZE} weight="bold" />

    // drizzle group
    case "drizzle":
      return <Drop size={ICON_SIZE} weight="bold" />

    // thunderstorm group
    case "thunderstorm":
      return <CloudLightning size={ICON_SIZE} weight="bold" />

    default:
      return <Rainbow size={ICON_SIZE} weight="bold" />
  }
}

const isInRange = (deg: number, start: number, end: number): boolean => {
  if (deg > start && deg < end) return true;
  return false;
}

type windDirection = {
  direction: string,
  startDeg: number,
  endDeg: number,
}

const windDirections: windDirection[] = [
  { direction: "N", startDeg: 360 - 11.25, endDeg: 11.25 },
  { direction: "NNE", startDeg: 11.25, endDeg: 3 * 11.25 },
  { direction: "NE", startDeg: 3 * 11.25, endDeg: 5 * 11.25 },
  { direction: "ENE", startDeg: 5 * 11.25, endDeg: 7 * 11.25 },
  { direction: "E", startDeg: 7 * 11.25, endDeg: 9 * 11.25 },
  { direction: "ESE", startDeg: 9 * 11.25, endDeg: 11 * 11.25 },
  { direction: "SE", startDeg: 11 * 11.25, endDeg: 13 * 11.25 },
  { direction: "SSE", startDeg: 13 * 11.25, endDeg: 15 * 11.25 },
  { direction: "S", startDeg: 15 * 11.25, endDeg: 17 * 11.25 },
  { direction: "SSW", startDeg: 17 * 11.25, endDeg: 19 * 11.25 },
  { direction: "SW", startDeg: 19 * 11.25, endDeg: 21 * 11.25 },
  { direction: "WSW", startDeg: 21 * 11.25, endDeg: 23 * 11.25 },
  { direction: "W", startDeg: 23 * 11.25, endDeg: 25 * 11.25 },
  { direction: "WNW", startDeg: 25 * 11.25, endDeg: 27 * 11.25 },
  { direction: "NW", startDeg: 27 * 11.25, endDeg: 29 * 11.25 },
  { direction: "NNW", startDeg: 29 * 11.25, endDeg: 31 * 11.25 },
]
const determineWindDirection = (deg: number): string => {
  deg = deg % 360;
  let direction = String(deg) + "°";

  windDirections.forEach(dir => {
    if (isInRange(deg, dir.startDeg, dir.endDeg)) { direction = dir.direction; return; }
  })
  return direction;
}
const WeatherSummaryApp: React.FC<{}> = ({ }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherDataCurrent | null>(null);
  const [additionalWeatherData, setAdditionalWeatherData] = useState<AdditionalWeather | null>(null);

  useEffect(() => {
    const getCurrentWeather = async () => {
      console.log("GET CURRENT WEATHER")
      let key = localStorage.getItem("openweather_key");
      console.log(key)
      if (key && key.length > 0) {
        // get current weather data
        let weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=52.51637&lon=13.37849&appid=${key}&units=metric`);
        let weatherData = await weatherRes.json();
        // set weatherData city because the openweathermap api city is jsut the location name of the weather station
        let locationRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=52.51637&lon=13.37849`);
        let locationData = await locationRes.json()
        // weatherData.name = `${weatherData.name}, ${locationData.address.borough}, ${locationData.address.city}, ${locationData.address.country}`
        weatherData.name = `${locationData.address.city}, ${locationData.address.country}`

        console.log("[WeatherData]", weatherData)
        setCurrentWeather(weatherData)

        // convert unix format to date object of current timezone
        // currentWeather.timezoen is time offset from UTC in seconds
        let dateTaken = new Date(weatherData.dt * 1000);
        let sunriseTime = new Date(weatherData.sys.sunrise * 1000)
        let sunsetTime = new Date(weatherData.sys.sunset * 1000)

        let beforeSunrise = false;
        let afterSunset = false;
        if (dateTaken < sunriseTime) {
          beforeSunrise = true;
        } else if (dateTaken > sunsetTime) {
          afterSunset = true;
        }
        let isDaylight = !(beforeSunrise || afterSunset);


        let weatherMainIcon = determineWeatherMainIcon(weatherData.weather[0].main.toLowerCase(), isDaylight, weatherData.clouds.all);
        let windDirection = determineWindDirection(180 + weatherData.wind.deg);

        setAdditionalWeatherData({
          dateTaken: dateTaken,
          sunriseTime: sunriseTime,
          sunsetTime: sunsetTime,
          beforeSunrise: beforeSunrise,
          afterSunset: afterSunset,
          isDaylight: isDaylight,
          weatherMainIcon: weatherMainIcon,
          windDirection: windDirection
        })
      } else {
        setCurrentWeather(null)
        setAdditionalWeatherData(null)
      }
    }

    getCurrentWeather()
    let updateWeatherInterval = setInterval(() => getCurrentWeather(), 2 * 60 * 1000);


    return () => {
      clearInterval(updateWeatherInterval);
    }
  }, []);





  return (
    <AppContainerVH backgroundColor="var(--one)">
      <SetAPIKey show={!currentWeather}>
        Insert OpenWeather Current Weather Data API Key
        <input ref={inputRef} type="text" name="api key" />
        <button onClick={() => { if (inputRef.current) localStorage.setItem("openweather_key", inputRef.current.value ?? ""); window.location.reload() }}>Show Weather Data</button>
      </SetAPIKey>

      {currentWeather ?
        <>
          <WeatherHeader>
            <CenteredDiv>
              <VStack>
                {additionalWeatherData?.weatherMainIcon}
              </VStack>
            </CenteredDiv>
            <TempText>{Math.round(currentWeather?.main.temp ?? 0)}°C</TempText>
            <CenteredDiv>
              <VStack>
                <TempMinMax>
                  <TempMinMaxText>{Math.round(currentWeather?.main.temp_max ?? 0)}°C</TempMinMaxText> <ThermometerHot />
                </TempMinMax>
                <TempMinMax>
                  <TempMinMaxText>{Math.round(currentWeather?.main.temp_min ?? 0)}°C</TempMinMaxText> <ThermometerCold />
                </TempMinMax>
              </VStack>
            </CenteredDiv>
          </WeatherHeader>

          <HL length={90} scale={0.5} backgroundColor="var(--three)" />
          <HL length={90} scale={2} backgroundColor="var(--one)" />

          <VStack>
            <ConditionDesc>{currentWeather?.weather[0].description}</ConditionDesc>
            <HL length={90} backgroundColor="var(--six)" />

            <InfoBox>
              <InfoBoxRow>
                <InfoBoxElement><Wind size={30} weight="bold" /> <p>{currentWeather?.wind.speed}</p> m/s </InfoBoxElement>
                <InfoBoxElement><Rotate r={180 + (currentWeather?.wind.deg ?? 0)}> <WindArrow size={30} /> </Rotate> <p>{additionalWeatherData?.windDirection}</p> </InfoBoxElement>
              </InfoBoxRow>

              <HL length={96} scale={0.6} backgroundColor="var(--two)" />

              <InfoBoxRow>
                <InfoBoxElement><DropHalf size={30} weight="bold" /> <p>{currentWeather?.main.humidity} %</p> </InfoBoxElement>
                <InfoBoxElement><Tray size={30} weight="bold" /> <p>{currentWeather?.main.pressure} hPa</p> </InfoBoxElement>
              </InfoBoxRow>

              <HL length={96} scale={0.6} backgroundColor="var(--two)" />

              <InfoBoxRow>
                <InfoBoxElement><SunHorizon size={30} weight="fill" /> <p>{format(additionalWeatherData?.sunriseTime ?? 0, "HH:mm")}</p> </InfoBoxElement>
                <InfoBoxElement><SunHorizon size={30} weight="regular" /> <p>{format(additionalWeatherData?.sunsetTime ?? 0, "HH:mm")}</p> </InfoBoxElement>
              </InfoBoxRow>
            </InfoBox>

            <HL length={90} scale={0.5} backgroundColor="var(--four)" />
          </VStack>
          <LocationTextWrapper>
            <LocationText>{format(additionalWeatherData?.dateTaken ?? 0, 'HH:mm yyyy-MM-dd')} -- {currentWeather?.name}</LocationText>
          </LocationTextWrapper>
        </>
        : null
      }
    </AppContainerVH>
  )
}

export default WeatherSummaryApp;