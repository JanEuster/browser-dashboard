import styled from "styled-components";
import globalStyles from "../../styles/home.module.css";

export const HL = styled.div`
  width: 100%;
  height: 0.3rem;
  background-color: var(--four);
`;

export const VL = styled.div`
  width: 0.3rem;
  height: 90%;
  background-color: var(--four);
`;

export const HStack100 = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  // justify-content: space-evenly;
  align-items: center;
  padding: 2rem 0;
`
export const VStack100 = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-evenly;
  align-items: center;
`

export const HStack = styled.div<{height: string}>`
  width: 100%;
  height: ${props => props.height};
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

export const VStack = styled.div<{width: string}>`
  width: ${props => props.width};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

export const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 5;
  background-color: var(--zero);
  // min-height: 250px;
  background-color: black;

  display: flex;
  flex-direction: column;
`;

export const AppContainerV = styled.div`
  width: 100%;
  height: 70%;
  background-color: var(--zero);
  // min-height: 250px;
  background-color: black;

  display: flex;
  flex-direction: column;
`;

export const SpacerV = styled.hr`
  width: 100%;
  min-height: 5px;
  height: 20px;
`

export const SpacerH = styled.hr`
  min-width: 5px;
  width: 20px;
  height: 100%;
`