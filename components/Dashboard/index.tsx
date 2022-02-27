import NotesApp from "./Notes";
import WebLinksApp from "./WebLinks"
import WeatherSummaryApp from "./Weather"
import { VStack100, HStack100, SpacerV, VStack, SpacerH, AppContainerVH, AppContainer } from "../common";
import { WeatherDataCurrent } from "../../types";

const Dashboard: React.FC<{ currentWeather: WeatherDataCurrent }> = ({ currentWeather }) => {
  return (
    <VStack100>
      <HStack100>
        <VStack width="375px" shrink={0} >
          <NotesApp basis={250} shrink={1} />
          <SpacerV />
          <WeatherSummaryApp currentWeather={currentWeather} />
        </VStack>

        <SpacerH />

        <VStack width="200px" shrink={0} >
          <WebLinksApp />
          <SpacerV />
          <AppContainerVH />
        </VStack>

        <SpacerH />

        <VStack width="1000px" shrink={0}>
          <AppContainerVH />
          <SpacerV />
          <AppContainerVH />
        </VStack>

        <SpacerH />

        <AppContainer width={400} shrink={0.1} />
        <SpacerH />
        <AppContainer width={600} shrink={0.1} />

      </HStack100>
    </VStack100>
  )
}

export default Dashboard;