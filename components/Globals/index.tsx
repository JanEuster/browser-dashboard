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
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem 0;
`
export const VStack100 = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const HStack = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const VStack = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`