import { LinkCard, Favicon, LinkTitle } from "./weblinks.styles";
import globalStyles from "../../../styles/Home.module.css";
import Link from "next/link";
import { LinkApp } from "../common";
import { ArrowSquareOut } from "phosphor-react";

const LinkItem: React.FC<{ title: string, src: string }> = ({ title, src }) => {
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

const WebLinksApp: React.FC<{ shrink?: number }> = ({ shrink }) => {
  return (
    <LinkApp icon={<ArrowSquareOut size={24} weight="bold" />} title="Links">
      <LinkItem key="ddg" title="DuckDuckGo" src="https://www.duckduckgo.com/" />
      <LinkItem key="yt" title="Youtube" src="https://www.youtube.com/" />
      <LinkItem key="ttv" title="Twitch" src="https://www.twitch.tv/" />
      <LinkItem key="gh" title="Github" src="https://github.com/" />
      <LinkItem key="steam" title="Steam" src="https://www.steampowered.com/" />
      <LinkItem key="blend" title="Blender" src="https://www.blender.org/" />
    </LinkApp>
  )
}

export default WebLinksApp;