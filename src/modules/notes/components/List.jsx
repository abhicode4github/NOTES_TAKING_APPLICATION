import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { noteOperations } from "../service/note-operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTotalRecords, searchNote, sortNote } from "../redux/note-slice";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
export const List = (props) => {
  const [sort, setSort] = useState("");
  //console.log('Props are ', props.notes);
  const dispatch = useDispatch();
  const takeSearchValue = (event) => {
    const searchValue = event.target.value;
    console.log("Search Value is ", searchValue);
    const searchData = { search: searchValue };
    dispatch(searchNote(searchData));
  };
  const sortIt = (event) => {
    const sortBy = event.target.value;
    setSort(sortBy);
    dispatch(sortNote({ sortBy }));
  };
  const notesObject = useSelector((state) => {
    console.log("*********** State is ", state);
    return {
      notes: state.noteSlice.notes,
      total: state.noteSlice.total,
      results: state.noteSlice["search-result"],
    };
  }); // Pull
  // Component (HTML Page) Mount
  // Life Cycle Methods (Hook)
  useEffect(() => {
    // Component Mount
    console.log("Component Mount....");
    dispatch(getTotalRecords()); // Push
  }, []);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <div>
      <h1>Total Records {notesObject.total}</h1>
      <TextField
        onChange={takeSearchValue}
        label="Search by Title"
        variant="outlined"
      />
      <br />
      <InputLabel id="demo-simple-select-label">Sort</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Sort"
        onChange={sortIt}
      >
        <MenuItem value="id">By id</MenuItem>
        <MenuItem value="title">By title</MenuItem>
        <MenuItem value="descr">By descr</MenuItem>
      </Select>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "black", color: "white" }}>
            <TableRow>
              <StyledTableCell align="right">Id</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Descr</StyledTableCell>
              <StyledTableCell align="left">Completion Date</StyledTableCell>
              <StyledTableCell align="right">Importance</StyledTableCell>
              <StyledTableCell align="right">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notesObject.results.length > 0 &&
              notesObject.results.map((note) => {
                return (
                  <TableRow>
                    <TableCell align="right">{note.id}</TableCell>
                    <TableCell align="left">{note.title}</TableCell>
                    <TableCell align="left">{note.descr}</TableCell>
                    <TableCell align="left">{note.cdate}</TableCell>
                    <TableCell align="right">{note.importance}</TableCell>
                    {/* <TableCell align="right"><i class="fa-solid fa-trash"></i> <i class="fa-solid fa-pen-to-square"></i></TableCell> */}
                    <TableCell align="right">
                      <DeleteIcon /> <EditIcon />
                    </TableCell>
                  </TableRow>
                );
              })}
            {notesObject.results.length == 0 &&
              notesObject.notes.map((note) => {
                return (
                  <TableRow>
                    <TableCell align="right">{note.id}</TableCell>
                    <TableCell align="left">{note.title}</TableCell>
                    <TableCell align="left">{note.descr}</TableCell>
                    <TableCell align="left">{note.cdate}</TableCell>
                    <TableCell align="right">{note.importance}</TableCell>
                    {/* <TableCell align="right"><i class="fa-solid fa-trash"></i> <i class="fa-solid fa-pen-to-square"></i></TableCell> */}
                    <TableCell align="right">
                      <DeleteIcon /> <EditIcon />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <h1>{props.note.id} {props.note.title} {props.note.descr}</h1> */}
    </div>
  );
};
