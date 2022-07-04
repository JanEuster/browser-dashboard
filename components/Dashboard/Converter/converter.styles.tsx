import styled from "styled-components";
import { NoteHeaderContainer, NoteHeaderTitle } from "../Notes/notes.styles";
import { evaluate } from "mathjs"

export const Header = styled(NoteHeaderContainer)`
  height: 50px;
`
export const HeaderTitle = styled(NoteHeaderTitle)`
  font-size: 24px;
`;

export const ContentWrapper = styled.div`
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
  background: var(--two);
  border: none;
  color: var(--text);

  &:focus {
    outline: 2px solid var(--four);
  }

  &::-webkit-input-placeholder {
    opacity: 0.4;
  }
`

export const Result = styled.p`
  font-family: Roboto;
  font-size: 20px;
  outline: 1px solid var(--six);
  padding: 10px 30px;
  max-width: 90%;
  overflow-wrap: anywhere;

  position: relative;
  &::before {
    position: absolute;
    content: "Result:";
    top: 0;
    left: 0;
    font-size: 14px;
    font-weight: 700;
    transform: translateY(-100%);
  }
`