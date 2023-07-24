import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "noteslice",
  initialState: { notes: [], total: 0, "search-result": [] },
  reducers: {
    // CRUD Operations
    // Sync Operations
    // action - coming from the component
    // state - update the centeralized store.
    addNote(state, action) {
      const noteObject = action.payload;
      console.log("Add Note Reducer Operation Called.... ", action.payload);
      state.notes.push(noteObject);
    },
    getTotalRecords(state, action) {
      state.total = state.notes.length;
    },
    removeNote(state, action) {},
    searchNote(state, action) {
      const searchObj = action.payload;
      console.log("Search Obj :::: ", searchObj);
      //state['search-result'] = state.notes.filter(note=>note.title.includes(searchObj.search));
      state["search-result"] = state.notes.filter(
        (note) => note.id == searchObj.search
      );
    },
    sortNote(state, action) {
      const sortObject = action.payload;
      const key = sortObject.sortBy;
      state.notes.sort((first, second) => {
        if (key == "id") {
          return first[key] - second[key];
        } else {
          return first[key].localeCompare(second[key]);
        }
      });
    },
  },
  extraReducers: {
    // Async Operations
  },
});
export const {
  addNote,
  removeNote,
  getNote,
  getTotalRecords,
  searchNote,
  sortNote,
} = noteSlice.actions; // Component
export default noteSlice.reducer;
