import { Cloud, CloudFog, CloudLightning, CloudMoon, CloudRain, CloudSnow, Drop, DropHalf, Moon, MoonStars, Sun, SunDim, Tray, Wind, Rainbow, ThermometerCold, ThermometerHot, SunHorizon, Flame, Gradient, FunnelSimple, CloudSun } from "phosphor-react";
import React, { ReactElement, useEffect, useState } from "react";
import { AppContainerVH, CustomIcon, HL, Rotate, VL, VStack } from "../../common";
import { CenteredDiv, ConditionDesc, InfoBox, InfoBoxElement, InfoBoxRow, LocationText, LocationTextWrapper, TempMinMax, TempMinMaxText, TempText, WeatherHeader } from "./weather.styles";
import { format } from "date-fns";
import { WeatherDataCurrent } from "../../../types";

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

const WeatherSummaryApp: React.FC<{ currentWeather: WeatherDataCurrent }> = ({ currentWeather }) => {
  // convert unix format to date object of current timezone
  // currentWeather.timezoen is time offset from UTC in seconds
  let dateTaken = new Date(currentWeather.dt * 1000);
  let sunriseTime = new Date(currentWeather.sys.sunrise * 1000)
  let sunsetTime = new Date(currentWeather.sys.sunset * 1000)
  console.log(currentWeather);

  let beforeSunrise, afterSunset = false;
  if (dateTaken < sunriseTime) {
    beforeSunrise = true;
  } else if (dateTaken > sunsetTime) {
    afterSunset = true;
  }
  let isDaylight = !(beforeSunrise || afterSunset)


  let weatherMainIcon = determineWeatherMainIcon(currentWeather.weather[0].main.toLowerCase(), isDaylight)

  return (
    <AppContainerVH backgroundColor="var(--one)">
      <WeatherHeader>
        <CenteredDiv>
          <VStack>
            {weatherMainIcon}
          </VStack>
        </CenteredDiv>
        <TempText>{Math.round(currentWeather.main.temp)}°C</TempText>
        <CenteredDiv>
          <VStack>
            <TempMinMax>
              <TempMinMaxText>{Math.round(currentWeather.main.temp_max)}°C</TempMinMaxText> <ThermometerHot />
            </TempMinMax>
            <TempMinMax>
              <TempMinMaxText>{Math.round(currentWeather.main.temp_min)}°C</TempMinMaxText> <ThermometerCold />
            </TempMinMax>
          </VStack>
        </CenteredDiv>
      </WeatherHeader>

      <HL length={90} scale={0.5} backgroundColor="var(--three)" />
      <HL length={90} scale={2} backgroundColor="var(--one)" />

      <VStack>
        <ConditionDesc>{currentWeather.weather[0].description}</ConditionDesc>
        <HL length={90} backgroundColor="var(--six)" />

        <InfoBox>
          <InfoBoxRow>
            <InfoBoxElement><Wind size={30} weight="bold" /> {currentWeather.wind.speed} m/s </InfoBoxElement>
            <InfoBoxElement><Rotate r={currentWeather.wind.deg}> <WindArrow size={30} /> </Rotate> {currentWeather.wind.deg}° </InfoBoxElement>
          </InfoBoxRow>

          <HL length={96} scale={0.6} backgroundColor="var(--two)" />

          <InfoBoxRow>
            <InfoBoxElement><DropHalf size={30} weight="bold" />{currentWeather.main.humidity} %</InfoBoxElement>
            <InfoBoxElement><Tray size={30} weight="bold" />{currentWeather.main.pressure} hPa</InfoBoxElement>
          </InfoBoxRow>

          <HL length={96} scale={0.6} backgroundColor="var(--two)" />

          <InfoBoxRow>
            <InfoBoxElement><SunHorizon size={30} weight="fill" />{format(sunriseTime, "HH:mm")}</InfoBoxElement>
            <InfoBoxElement><SunHorizon size={30} weight="regular" />{format(sunsetTime, "HH:mm")}</InfoBoxElement>
          </InfoBoxRow>
        </InfoBox>

        <HL length={90} scale={0.5} backgroundColor="var(--four)" />
      </VStack>
      <LocationTextWrapper>
        <LocationText>{format(dateTaken, 'HH:mm yyyy-MM-dd')} -- {currentWeather.name}</LocationText>
      </LocationTextWrapper>
    </AppContainerVH>
  )
}

export default WeatherSummaryApp;