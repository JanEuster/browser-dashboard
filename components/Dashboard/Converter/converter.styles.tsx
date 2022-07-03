import styled from "styled-components";
import { NoteHeaderContainer, NoteHeaderTitle } from "../Notes/notes.styles";
import { evaluate } from "mathjs"

export const Header = styled(NoteHeaderContainer)`
  height: 50px;
`
export const HeaderTitle = styled(NoteHeaderTitle)`
  font-size: 24px;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export const Input = styled.input`
  width: 90%;
  height: 36px;
  padding: 0 5px;
  font-size: 18px;
`

export const Result = styled.p`

`