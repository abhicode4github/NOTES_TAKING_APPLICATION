import { Note } from "../models/note";
// Service - CRUD Logic
export const noteOperations = {
  notes: [],
  addNote(id, title, descr, cdate, importance) {
    const noteObject = new Note(id, title, descr, cdate, importance);
    this.notes.push(noteObject);
    console.log("All notes are ", this.notes);
    return noteObject;
  },
  getNotes() {
    return this.notes;
  },
};
