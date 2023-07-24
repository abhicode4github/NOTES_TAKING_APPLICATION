import { useState } from "react";
import { Header } from "../../../shared/components/Header";
import { Add } from "../components/Add";
import { List } from "../components/List";
import Container from "@mui/material/Container";
import { noteOperations } from "../service/note-operations";

export const NotePage = () => {
  console.log("Note Page Call");
  const [notes, setNotes] = useState([]);
  const collectNoteData = () => {
    //const notesArray = noteOperations.getNotes();
    //console.log(notesArray);
    setNotes([...noteOperations.getNotes()]);
    //console.log('Rec data from Add ', noteObject, ' ');
  };
  return (
    <Container fixed>
      <Header />
      <Add fn={collectNoteData} />
      <List notes={notes} />
    </Container>
  );
};
