import styled from "styled-components"

export const AppContainer = styled.div`
  width: 175px;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: 2rem;
  background-color: var(--two);
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
`

export const HeaderTitle = styled.div`
  font-size: 1.4em;
  color: var(--six);
`

export const LinksContainer = styled.div`
  background-color: var(--one);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`

export const LinkLink = styled.div`
  width: 93%;
  height: 100%;
  max-height: 45px;
  background-color: var(--three);
  border-radius: 15px;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0.2rem 0;
  overflow: hidden;
`

export const LinkImage = styled.img`
  background-color: var(--zero);
  height: 100%;
  aspect-ratio: 1;
  border-radius: 15px 0 0 15px;
  border: 2px solid var(--four);
`

export const LinkTitle = styled.span`
  margin: 0 0.2rem;
  font-family: Roboto medium;
`