import React, { useEffect, useRef, useState } from "react";
import {
  NoteHeaderTitle,
  NoteTitle,
  NoteContent,
  NoteHeaderContainer,
  NotePreviewListContainer,
  NotePreviewContainer,
  Icon,
  NoteContentContainer,
  NoteEditableTitle,
} from "./notes.styles";
import { IFlex, INote } from "../../../types";
import { Plus, Notepad, Note as NoteIcon, X, Trash } from "phosphor-react";
import { AppContainerVH, HL, VL } from "../../common";


const NotePreview: React.FC<{ title: string; setNoteView: Function }> = (
  props
) => {
  return (
    <NotePreviewContainer onClick={() => props.setNoteView()}>
      <NoteIcon size={38} weight="bold" />
      <VL scale={0.45} />
      <NoteTitle>{props.title}</NoteTitle>
    </NotePreviewContainer>
  );
};

const NoteView: React.FC<{ content: string; setContent: Function }> = (
  props
) => {
  return (
    <>
      <NoteContentContainer>
        <NoteContent
          placeholder="note text..."
          defaultValue={props.content}
          onChange={(e) => props.setContent(e)}
        ></NoteContent>
      </NoteContentContainer>
    </>
  );
};

const NotesApp: React.FC<IFlex> = ({basis, shrink, grow}) => {
  const [notes, setNotes] = useState<INote[]>([]);

  const titleInputRef = useRef();

  const [noteView, setNoteView] = useState<INote | undefined>(undefined);

  function changeTitle(title: string) {
    if (noteView)
      setNoteView({ id: noteView.id, title: title, content: noteView.content });
  }
  function changeContent(content: string) {
    if (noteView)
      setNoteView({ id: noteView.id, title: noteView.title, content: content });
  }

  function addNote() {
    // find minimal id
    let minID = 0;
    notes?.forEach((note) => {
      if (note.id > 0) minID = note.id;
    });
    minID += 1;

    let newNote: INote = { id: minID, title: "", content: "" };
    setNoteView(newNote);
  }

  function closeNote() {
    let noteID = noteView?.id;
    let notesPos: number | undefined = undefined;
    notes?.forEach((note, i) => {
      if (note.id === noteID) {
        notesPos = i;
      }
    });


    let newNotes: INote[] | undefined;
    if (noteView) {
      if (noteView?.title === "") noteView.title = "New Note";
      
      if (notesPos !== undefined) {
        newNotes = notes?.slice(0, notesPos);
        newNotes?.push(noteView);
        newNotes?.push(...notes?.slice(notesPos + 1));
      } else {
        newNotes = [...notes, noteView];
      }
    }

    if (newNotes) setNotes(newNotes);
    setNoteView(undefined);
  }

  function deleteNote() {
    let newNotes: INote[] | undefined = notes?.filter(
      (note) => note.id !== noteView?.id
    );
    setNotes(newNotes);
    setNoteView(undefined);
  }

  useEffect(() => {
    try {
      const json = localStorage.getItem("Notes");
      const n = JSON.parse(json ? json : "");
      if (n) {
        setNotes(n);
        console.log("load notes");
      }
    } catch (err) {
      console.log("nothing to load");
    }
  }, []);

  useEffect(() => {
    let json: string;
    if (notes) {
      json = JSON.stringify(notes);
    } else {
      json = "[]";
    }

    localStorage.setItem("Notes", json);
    console.log("save notes");
  }, [notes]);

  return (
    <AppContainerVH basis={basis} shrink={shrink} grow={grow}>
          
        <NoteHeaderContainer>
          {noteView ? (
            <>
              <NoteIcon size={40} weight="bold" />
              <NoteEditableTitle
                type="text"
                ref={titleInputRef}
                placeholder="New Note"
                value={noteView.title}
                onChange={(e) => changeTitle(e.target.value)}
                />
              <Icon onClick={() => closeNote()}>
                <X size={40} weight="bold" />
              </Icon>
              <Icon onClick={() => deleteNote()}>
                <Trash size={40} weight="bold" />
              </Icon>
            </>
          ) : (
            <>
              <Notepad size={44} weight="bold" />
              <NoteHeaderTitle> Notes </NoteHeaderTitle>
              <Icon onClick={() => addNote()}>
                <Plus size={40} weight="bold" />
              </Icon>
            </>
          )}
        </NoteHeaderContainer>

        <HL />
        
      {noteView ? (
        <NoteView
        content={noteView.content}
        setContent={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeContent(e.target.value)
        }
        />
      ) : (
        <NotePreviewListContainer>
            {notes !== undefined &&
              notes.map((note, i) => {
                return (
                  <NotePreview
                  key={i}
                  title={note.title}
                  setNoteView={() => setNoteView(note)}
                  />
                  );
                })}
          </NotePreviewListContainer>
      )}
      <HL />
    </AppContainerVH>
  );
};

export default NotesApp;
