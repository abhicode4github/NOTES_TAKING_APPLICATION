import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SpatialAudioOffIcon from "@mui/icons-material/SpatialAudioOff";
import IconButton from "@mui/material/IconButton";
import DescriptionIcon from "@mui/icons-material/Description";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import { noteOperations } from "../service/note-operations";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiColorInput } from "mui-color-input";
import { addNote } from "../redux/note-slice";
import { Note } from "../models/note";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
export const Add = (props) => {
  const id = useRef();
  const title = useRef();
  const descr = useRef();
  const [dateValue, setDateValue] = useState(null);
  const [colorValue, setColorValue] = useState("#ffffff");
  //const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  const takeNote = () => {
    console.log("Add Note is Called...");
    const idValue = id.current.value;
    const titleValue = title.current.value;
    const descValue = descr.current.value;
    // console.log('Date ',dateValue);
    const date = dateValue ? dayjs(dateValue).format("MM/DD/YYYY") : "";
    console.log("Now Date is ", date);
    console.log("Color ", colorValue);
    const noteObject = new Note(
      idValue,
      titleValue,
      descValue,
      date,
      colorValue
    );
    dispatch(addNote(noteObject));
    setOpen(true);
    //setMessage('Record Added...');
    // setTimeout(()=>{
    //   setMessage('');
    // },2000);
    // console.log('Id ',idValue);
    // console.log('Title ', titleValue);
    // console.log('Descr ', descValue);
    // Put the data in an object (Object Literal)
    //const noteObject = {'id':idValue, 'title':titleValue,
    //'descr':descValue};
    //const noteObject = noteOperations.addNote(idValue, titleValue, descValue, '','')
    //noteOperations.addNote(idValue, titleValue, descValue, date,colorValue)
    // props.fn(); // Call collectNoteData
  };

  return (
    <>
      <Box
        sx={{
          margin: 5,
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Note Added"
          action={action}
        />
        {/* <Typography>
          {message}
        </Typography> */}
        <TextField
          id="note-id"
          inputRef={id}
          label="Id"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="note-title"
          label="Title"
          inputRef={title}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SpatialAudioOffIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          inputRef={descr}
          id="note-desc"
          label="Description"
          multiline
          maxRows={4}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SpatialAudioOffIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dateValue}
            onChange={(selectedDate) => setDateValue(selectedDate)}
          />
        </LocalizationProvider>

        <MuiColorInput
          value={colorValue}
          onChange={(selectedColor) => setColorValue(selectedColor)}
        />
        {/* <input type='date'/>
      <input type='color'/> */}
        <Button onClick={takeNote} variant="contained" color="warning">
          Add Note
        </Button>
        {/* <DatePicker value={value} 
       onChange={(selectedDate) => setValue(selectedDate)} /> */}
      </Box>
    </>
  );
};
