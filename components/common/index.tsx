import styled from "styled-components";
import globalStyles from "../../styles/home.module.css";
import { IFlex } from "../../types";

export const HL = styled.div<{ scale?: number, length?: number, backgroundColor?: string }>`
  width: ${props => props.length ? props.length : 100}%;
  height: ${props => props.scale ? props.scale * 0.3 : 0.3}rem;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : "var(--four)"};

  margin-left: auto;
  margin-right: auto;
`;

export const VL = styled.div<{ scale?: number, length?: number, backgroundColor?: string }>`
  width: ${props => props.scale ? props.scale * 0.3 : 0.3}rem;
  height: ${props => props.length ? props.length : 100}%;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : "var(--four)"};

  margin-top: auto;
  margin-bottom: auto;
  `;

export const HStack100 = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  // justify-content: space-evenly;
  align-items: center;
  // padding: 2rem 0;

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
  width: 95vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-evenly;
  align-items: center;
`


interface IStack extends IFlex {
  width?: string;
  height?: string;
}
export const HStack = styled.div <IStack>`
  width: 100%;
  height: ${(props) => props.height};
  ${(props) => props.basis !== undefined ? `flex-basis: ${props.basis}%;` : null}
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

export const VStack = styled.div<IStack>`
  width: ${props => props.width};
  height: 100%;
  ${(props) => props.basis !== undefined ? `flex-basis: ${props.basis}%;` : null}
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

interface IContainer extends IFlex {
  width?: number;
  height?: number;
  backgroundColor?: string;
}
export const AppContainer = styled.div<IContainer>`
  width: ${props => props.width !== undefined ? `${props.width}px` : "100%"};
  height: ${props => props.height !== undefined ? `${props.height}px` : "100%"};
  // min-width: 150px;
  // min-height: 150px;
  ${(props) => props.basis !== undefined ? `flex-basis: ${props.basis}%;` : null}
  ${(props) => props.shrink !== undefined ? `flex-shrink: ${props.shrink};` : null}
  ${(props) => props.grow !== undefined ? `flex-grow: ${props.grow};` : null}

  background-color: ${props => props.backgroundColor ? props.backgroundColor : "var(--zero)"};

  display: flex;
  flex-direction: column;
`;

interface IContainerVH extends IFlex {
  backgroundColor?: string;
}
export const AppContainerVH = styled.div<IContainerVH>`
  width: 100%;
  height: 100%;
  // min-width: 150px;
  // min-height: 150px;
  ${(props) => props.basis !== undefined ? `flex-basis: ${props.basis}%;` : null}
  ${(props) => props.shrink !== undefined ? `flex-shrink: ${props.shrink};` : null}
  ${(props) => props.grow !== undefined ? `flex-grow: ${props.grow};` : null}
  background-color: ${props => props.backgroundColor ? props.backgroundColor : "var(--zero)"};

  display: flex;
  flex-direction: column;
`;


export const SpacerV = styled.hr`
  width: 100%;
  min-height: 10px;
  height: 20px;
`;

export const SpacerH = styled.hr`
  min-width: 10px;
  width: 20px;
  height: 100%;
`;

export const CustomIcon = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

export const Rotate = styled.span<{ r: number }>`
  transform: rotate(${props => props.r}deg);
`