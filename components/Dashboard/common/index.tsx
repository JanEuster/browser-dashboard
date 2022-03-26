import styled from "styled-components"
import { AppContainerVH, HL } from "../../common"
import globalStyles from "../../../styles/Home.module.css";
import { IFlex } from "../../../types";
import { ReactElement } from "react";

export const LinksHeader = styled.div`
  height: 2rem;
  background-color: var(--two);
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
`

export const LinksHeaderTitle = styled.div`
  margin-left: 4px;
  font-size: 1.4em;
  color: var(--six);
`

export const LinksContentContainer = styled.div`
  background-color: var(--one);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`

interface LinkAppProps extends IFlex {
  icon?: ReactElement;
  title: string
}

export const LinkApp: React.FC<LinkAppProps> = ({ icon, title, basis, shrink, grow, children }) => {
  return (
    <AppContainerVH basis={basis} shrink={shrink} grow={grow}>
      <LinksHeader>
        {icon ?? icon}
        <LinksHeaderTitle>{title}</LinksHeaderTitle>
      </LinksHeader>
      <HL />
      <LinksContentContainer className={globalStyles.noScrollbar}>
        {children}
      </LinksContentContainer>
      <HL />
    </AppContainerVH>
  )
}

