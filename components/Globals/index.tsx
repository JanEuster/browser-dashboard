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

  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb:hover {
  background: var(--four);
  cursor: pointer;
}
  &::-webkit-scrollbar-track {
    background-color: var(--one);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--three);
  }
`
export const VStack100 = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-evenly;
  align-items: center;
`

export const HStack = styled.div<{ height: string, shrink?: number, grow?: number }>`
  width: 100%;
  height: ${(props) => props.height};
  ${(props) => props.shrink !== undefined ? `flex-shrink: ${props.shrink};` : null}
  ${(props) => props.grow !== undefined ? `flex-grow: ${props.grow};` : null}

  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
 ; }
`

export const VStack = styled.div<{width: string, shrink?: number, grow?: number }>`
  width: ${props => props.width};
  height: 100%;
  ${(props) => props.shrink !== undefined ? `flex-shrink: ${props.shrink};` : null}
  ${(props) => props.grow !== undefined ? `flex-grow: ${props.grow};` : null}

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

export const AppContainer = styled.div<{ width?: number, height?: number, shrink?: number, grow?: number }>`
  width: ${props => props.width !== undefined ? `${props.width}px` : "100%"};
  height: ${props => props.height !== undefined ? `${props.height}px` : "100%"};
  // min-width: 150px;
  // min-height: 150px;
  ${(props) => props.shrink !== undefined ? `flex-shrink: ${props.shrink};` : null}
  ${(props) => props.grow !== undefined ? `flex-grow: ${props.grow};` : null}

  background-color: var(--zero);
  // min-height: 250px;
  background-color: black;

  display: flex;
  flex-direction: column;
`;

export const AppContainerVH = styled.div<{ shrink?: number, grow?: number }>`
  width: 100%;
  height: 100%;
  // min-width: 150px;
  // min-height: 150px;
  ${(props) => props.shrink !== undefined ? `flex-shrink: ${props.shrink};` : null}
  ${(props) => props.grow !== undefined ? `flex-grow: ${props.grow};` : null}
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