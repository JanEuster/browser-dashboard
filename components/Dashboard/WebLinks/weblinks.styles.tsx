import styled from "styled-components"


export const LinkCard = styled.div`
  width: 93%;
  min-height: 2rem;
  height: 3.2vh;
  max-height: 3.5rem;
  background-color: var(--three);
  border-radius: 15px;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0.2rem 0;
  overflow: hidden;

  &:hover {
    background-color: var(--two);
  }
`

export const Favicon = styled.img`
  background-color: var(--zero);
  height: 100%;
  aspect-ratio: 1;
  border-radius: 15px 0 0 15px;
  // transform: scale(0.9);
  border: 2px solid var(--four);
`

export const LinkTitle = styled.span`
  margin: 0 0.2rem;
  font-family: Roboto medium;
`