import { HL, HStack, VL, VStack } from "../Globals";
import { AppContainer, Header, HeaderTitle, LinkCard, LinksContainer, Favicon, LinkTitle } from "./weblinks.styles";
import globalStyles from "../../styles/Home.module.css";
import Link from "next/link";

const LinkItem: React.FC<{title: string, src: string}> = ({title, src}) => {
  return (
    <Link href={src}>
      <a className={globalStyles.link}>
        <LinkCard>
          <Favicon
            src={
              `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${src}&size=48`
            }
          />
          <LinkTitle>{title}</LinkTitle>
        </LinkCard>
      </a>
    </Link>
  );
}

const WebLinks: React.FC<{}> = () => {
  return (
    <AppContainer>
      <Header>
        <HeaderTitle>Links</HeaderTitle>
      </Header>
      <VStack >
        <HL />
        <LinksContainer className={globalStyles.noScrollbar}>
          <LinkItem title="DuckDuckGo" src="https://www.duckduckgo.com/"/>
          <LinkItem title="Youtube" src="https://www.youtube.com/"/>
          <LinkItem title="Twitch" src="https://www.twitch.tv/"/>
          <LinkItem title="Github" src="https://github.com/"/>
          <LinkItem title="Steam" src="https://www.steampowered.com/"/>
          <LinkItem title="Blender" src="https://www.blender.org/"/>
        </LinksContainer>
        <HL />
      </VStack>
    </AppContainer>
  )
}

export default WebLinks;