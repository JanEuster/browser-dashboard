import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Drop, DropHalf, MoonStars, Sun, SunDim, Tray, Wind } from "phosphor-react";
import React, { ReactElement, useEffect, useState } from "react";
import { AppContainerVH, CustomIcon, HL, Rotate, VL, VStack } from "../../common";
import { CenteredDiv, ConditionDesc, InfoBox, InfoBoxElement, InfoBoxRow, LocationText, LocationTextWrapper, TempMinMax, TempMinMaxText, TempText, WeatherHeader } from "./weather.styles";

const WindArrow: React.FC<{ size: number }> = ({ size }) => { return <CustomIcon size={size}><svg viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000"><g fill="var(--six)"><path d="M510.5,749.6c-14.9-9.9-38.1-9.9-53.1,1.7l-262,207.3c-14.9,11.6-21.6,6.6-14.9-11.6L474,48.1c5-16.6,14.9-18.2,21.6,0l325,898.7c6.6,16.6-1.7,23.2-14.9,11.6L510.5,749.6z"></path><path d="M817.2,990c-8.3,0-16.6-3.3-26.5-9.9L497.2,769.5c-5-3.3-18.2-3.3-23.2,0L210.3,976.7c-19.9,16.6-41.5,14.9-51.4,0c-6.6-9.9-8.3-21.6-3.3-38.1L449.1,39.8C459,13.3,477.3,10,483.9,10c6.6,0,24.9,3.3,34.8,29.8l325,898.7c5,14.9,5,28.2-1.7,38.1C837.1,985,827.2,990,817.2,990z M485.6,716.4c14.9,0,28.2,5,39.8,11.6l255.4,182.4L485.6,92.9l-267,814.2l223.9-177.4C454.1,721.4,469,716.4,485.6,716.4z"></path></g></svg></CustomIcon> }

const ICON_SIZE = 80;

const WeatherSummaryApp: React.FC<> = ({ currentWeather }) => {
  console.log(currentWeather)
  let weatherMainIcon: ReactElement<any, any>;
  switch (currentWeather.weather[0].main.toLowerCase()) {
    case "clear":
      weatherMainIcon = <Sun size={ICON_SIZE} weight="bold" />
      break;
    case "clouds":
      weatherMainIcon = <Cloud size={ICON_SIZE} weight="bold" />
      break;
    case "atmosphere":
      weatherMainIcon = <CloudFog size={ICON_SIZE} weight="bold" />
      break;
    case "snow":
      weatherMainIcon = <CloudSnow size={ICON_SIZE} weight="bold" />
      break;
    case "rain":
      weatherMainIcon = <CloudRain size={ICON_SIZE} weight="bold" />
      break;
    case "drizzle":
      weatherMainIcon = <Drop size={ICON_SIZE} weight="bold" />
      break;
    case "thunderstorm":
      weatherMainIcon = <CloudLightning size={ICON_SIZE} weight="bold" />
      break;
    default:
      weatherMainIcon = <Sun size={ICON_SIZE} weight="bold" />
  }


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
              <TempMinMaxText>{Math.round(currentWeather.main.temp_max)}°C</TempMinMaxText> <SunDim />
            </TempMinMax>
            <TempMinMax>
              <TempMinMaxText>{Math.round(currentWeather.main.temp_min)}°C</TempMinMaxText> <MoonStars />
            </TempMinMax>
          </VStack>
        </CenteredDiv>
      </WeatherHeader>

      <VStack>
        <ConditionDesc>{currentWeather.weather[0].main}: {currentWeather.weather[0].description}</ConditionDesc>
        <HL length={90} backgroundColor="var(--six)" />
        <InfoBox>
          <InfoBoxRow>
            <InfoBoxElement><Wind size={30} weight="bold" /> {currentWeather.wind.speed} m/s </InfoBoxElement>
            <InfoBoxElement><Rotate r={currentWeather.wind.deg}> <WindArrow size={30} /> </Rotate> {currentWeather.wind.deg}° </InfoBoxElement>
          </InfoBoxRow>
          <InfoBoxRow>
            <InfoBoxElement><DropHalf size={30} weight="bold" />{currentWeather.main.humidity} %</InfoBoxElement>
          </InfoBoxRow>
          <InfoBoxRow>
            <InfoBoxElement><Tray size={30} weight="bold" />{currentWeather.main.pressure} hPa</InfoBoxElement>
          </InfoBoxRow>
        </InfoBox>
      </VStack>
      <LocationTextWrapper>
        <HL length={90} scale={0.5} backgroundColor="var(--four)" />
        <LocationText>{currentWeather.name}</LocationText>
      </LocationTextWrapper>
    </AppContainerVH>
  )
}

export default WeatherSummaryApp;