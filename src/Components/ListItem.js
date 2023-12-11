import React, { useState } from "react";
import { ReactDOM } from "react";
import "../css/style1.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark, faPencil, faCheck } from '@fortawesome/free-solid-svg-icons';
import MoreVert from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

const deleteNote = (id, noteList, setNoteList, userName) => {
  fetch("http://localhost:8080/" + userName + "/deleteNote", {
    method: "DELETE",
    body: id,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((convertedResponse) => {
      setNoteList(convertedResponse);
    });
};

const editNote = (
  id,
  noteList,
  isDisabled,
  setIsDisabled,
  unSavedValue,
  setNoteList,
  setEditButtonText,
  note,
  setUnSavedValue
) => {
  setUnSavedValue(note);
  setIsDisabled(!isDisabled);
  if (isDisabled) {
    setEditButtonText("Save");
  } else {
    setEditButtonText("Edit");
    fetch("http://localhost:8080/editNote", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        text: unSavedValue,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((convertedResponse) => {
        let tempList4 = JSON.parse(JSON.stringify(noteList));
        tempList4.forEach((obj) => {
          if (obj.id === convertedResponse.id) {
            obj.text = convertedResponse.text;
          }
        });
        setNoteList(tempList4);
      });
  }
};

const changed = (event, setUnSavedValue) => {
  let value = event.target.value;
  setUnSavedValue(value);
  console.log(value);
};

const ListItem = ({ note, id, noteList, setNoteList, userName }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [unSavedValue, setUnSavedValue] = useState(note);
  const [editButtonText, setEditButtonText] = useState("Edit");


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

<div className="note-top-right-buttons">
      {/* <div className="buttonContainer">
        <button onClick={() => deleteNote(id, noteList, setNoteList, userName)}>
          ❌
        </button>
        <button
          onClick={() => {
            editNote(
              id,
              noteList,
              isDisabled,
              setIsDisabled,
              unSavedValue,
              setNoteList,
              setEditButtonIcon,
              note,
              setUnSavedValue
            );
          }}
        >
          {editButtonIcon}
        </button>
      </div> */}
      
      <div className="notez">
      <IconButton aria-label="delete" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
            handleClose();
            editNote(
              id,
              noteList,
              isDisabled,
              setIsDisabled,
              unSavedValue,
              setNoteList,
              setEditButtonText,
              note,
              setUnSavedValue
            );
          }}>{editButtonText}</MenuItem>
        <MenuItem onClick={() => {
          handleClose();
          deleteNote(id, noteList, setNoteList, userName);
        }}>Delete</MenuItem>
      </Menu>

        <textarea
          style={
            note.length < 3
              ? { fontSize: "70px" }
              : note.length < 7
              ? { fontSize: "50px" }
              : note.length < 15
              ? { fontSize: "30px" }
              : {}
          }
          value={isDisabled ? note : unSavedValue}
          className={isDisabled ? "" : "textareaEnabled"}
          disabled={isDisabled}
          onChange={(event) => {
            changed(event, setUnSavedValue);
          }}
          onBlur={() => {
            handleClose();
            editNote(
              id,
              noteList,
              isDisabled,
              setIsDisabled,
              unSavedValue,
              setNoteList,
              setEditButtonText,
              note,
              setUnSavedValue
            );
          }}
        ></textarea>
      </div>
    </div>

  );
};

export default ListItem;
