import styled from "styled-components";


export const NoteHeaderContainer = styled.div`
  background-color: var(--one);
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0 0.3rem;
`;
export const NoteHeaderTitle = styled.span`
  color: var(--text);
  font-size: 2rem;
  padding: 0 0.3rem;
  user-select: none;
`;

export const NoteEditableTitle = styled.input`
  background-color: var(--one);
  width: 16rem;
  color: var(--text);
  font-family: Roboto black;
  font-size: 2rem;
  margin: 0.5rem 0.5rem;

  user-select: none;
  border: 0.15rem solid var(--two);

  &:hover {
    border: 0.15rem solid var(--three);
  }
  &:focus {
    border: 0.15rem solid var(--four);
    outline: none;
  }
`;

export const NotePreviewListContainer = styled.div`
  background-color: var(--two);
  width: 100%;
  height: 100%;
  padding: 0.4rem;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {width: 0px;}
`;

export const NotePreviewContainer = styled.div`
  background-color: var(--one);
  width: 100%;
  height: 3rem;
  margin-bottom: 0.3rem;
  border: 0.3rem solid var(--four);
  box-sizing: border-box;
  overflow: hidden;

  cursor: pointer;
  display: flex;
  align-items: center;
`;
export const NoteTitle = styled.h2`
  font-family: Roboto;
  font-size: 1.5rem;
  padding: 0 0.4rem;
  user-select: none;
  white-space: nowrap;
`;

export const NoteContentContainer = styled.div`
  background-color: var(--zero);
  width: 100%;
  height: calc(600px - 3.3rem);
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const NoteContent = styled.textarea`
  color: var(--five);
  background-color: var(--two);
  width: calc(100% - 0.6rem);
  height: calc(100% - 1rem);
  font-family: Roboto Mono;
  font-size: 1.3rem;
  resize: none;
  outline: none;

  &::selection {
    background-color: var(--one);
    color: var(--four);
  }

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

  &:focus {
  }
`;

export const Icon = styled.div`
  background-color: var(--two);
  border: 0.15rem solid var(--two);
  color: var(--five);
  height: 70%;
  aspect-ratio: 1;
  border-radius: 20%;
  margin: 0.1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--three);
    border: 0.15rem solid var(--four);
    color: var(--six);
    cursor: pointer;
  }
`;
