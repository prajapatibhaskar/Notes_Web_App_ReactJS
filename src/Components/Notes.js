import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import ListItem from "./ListItem";
import "../css/style1.css";

import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "font-awesome/css/font-awesome.min.css";
import WarningIcon from "@mui/icons-material/Warning";
import NotesIcon from "@mui/icons-material/Notes";

const Notes = ({ loggedInUser, setLoggedInUser, setLoggedIn }) => {
  const [noteList, setNoteList] = useState([]);
  const [notLoggedInContentToDisplay, setNotLoggedInContent] =
    useState(undefined);
  const [inputFieldContent, setInputFieldContent] = useState(undefined);

  const [addNoteModalOpen, setAddNoteModalOpen] = React.useState(false);
  const handleAddNoteModalOpen = () => setAddNoteModalOpen(true);
  const handleAddNoteModalClose = () => setAddNoteModalOpen(false);

  const [deleteConfirmationModalOpen, setdeleteConfirmationModalOpen] =
    React.useState(false);
  const handledeleteConfirmationModalOpen = () =>
    setdeleteConfirmationModalOpen(true);
  const handledeleteConfirmationModalClose = () =>
    setdeleteConfirmationModalOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    let signedInUser = localStorage.getItem("username");
    //equivalent to componentDidMount
    if (!signedInUser && !loggedInUser) {
      return;
    }
    if (!!signedInUser) {
      setLoggedInUser(signedInUser);
      setLoggedIn(true);
    }

    fetch(
      "http://localhost:8080/" +
        (signedInUser ? signedInUser : loggedInUser) +
        "/getNotes",
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((convertedResponse) => {
        console.log(convertedResponse);
        setNoteList(convertedResponse);
      });
  }, []);

  const deleteConfirmation = () => {
    setdeleteConfirmationModalOpen(true);
  };

  const addNote = () => {
    let text = inputFieldContent;
    fetch("http://localhost:8080/" + loggedInUser + "/addNote", {
      method: "POST",
      body: text,
    })
      .then((response) => {
        if (response.ok) {
          //for checking status 200

          return response.json();
        }
      })
      .then((convertedResponse) => {
        console.log(convertedResponse);
        let tempList = JSON.parse(JSON.stringify(noteList));

        //sets updated noteList to tempList

        tempList.push(convertedResponse);
        setNoteList(tempList);
      })
      .catch((ex) => {
        console.error(ex);
      })
      .finally(() => {
        setInputFieldContent("");
        // document.getElementById("inputField").value = "";
      });
  };

  const deleteUser = () => {
    fetch("http://localhost:8080/" + loggedInUser + "/deleteUser", {
      method: "DELETE",
    }).then(() => {
      setLoggedInUser(undefined);
      setLoggedIn(false);
      setNotLoggedInContent(`USER ${loggedInUser} DELETED`);
      localStorage.removeItem("username");
    });
  };

  return (
    <>
      {!!loggedInUser ? (
        <div>
          <div className="top-panel">
            <div className="top-left-content">
              <div className="heading">
                <div>
                  <h1 className="greeting">Hello, {loggedInUser}</h1>
                </div>
              </div>
            </div>
            <div className="top-right-content">
             
              <FormControl sx={{ m: 1, width: "10ch" }}>
                <Stack direction="column" spacing={4}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setLoggedInUser(undefined);
                      setLoggedIn(false);
                      localStorage.removeItem("username");
                      setNotLoggedInContent("LOGGED OUT");
                    }}
                    size={"medium"}
                    color={"primary"}
                  >
                    <Typography
                      variant="button"
                      display="block"
                      fontSize={12}
                      fontWeight={"bold"}
                    >
                      Logout
                    </Typography>
                  </Button>
                </Stack>
              </FormControl>

              <FormControl sx={{ m: 1, width: "15ch" }}>
                <Stack direction="column" spacing={4}>
                  <Button
                    variant="text"
                    onClick={() => {
                      deleteConfirmation();
                    }}
                    size={"small"}
                    color={"primary"}
                  >
                    <Typography
                      variant="button"
                      display="block"
                      fontSize={14}
                      fontWeight={"bold"}
                    >
                      Delete User
                    </Typography>
                  </Button>
                </Stack>
              </FormControl>
            </div>
          </div>
          <div className="toolbar">
            <Button variant="text" onClick={() => handleAddNoteModalOpen()}>
              <Typography
                variant="button"
                display="block"
                fontSize={14}
                fontWeight={"bold"}
              >
                Add note&nbsp;<i className="fa fa-pencil"></i>
              </Typography>
            </Button>
          </div>

          <Modal
            open={addNoteModalOpen}
            onClose={handleAddNoteModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                className="modal-text-area"
                id="outlined-multiline-static"
                label="Add a note"
                multiline
                rows={4}
                value={inputFieldContent}
                onChange={(event) => {
                  setInputFieldContent(event.target.value);
                }}
              />
              <footer className="modal-footer">
                <Button
                  variant="text"
                  disabled={!inputFieldContent}
                  className="inputFieldButton"
                  onClick={() => {
                    addNote();
                    handleAddNoteModalClose();
                  }}
                >
                  Add note
                </Button>
              </footer>
            </Box>
          </Modal>

          <Modal
            open={deleteConfirmationModalOpen}
            onClose={handledeleteConfirmationModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography variant="text" display="block" fontSize={18}>
                Are you sure about that?
              </Typography>
              <footer className="modal-footer">
                <div className={"delete-confirm-modal-button"}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      deleteUser();
                    }}
                    size={"small"}
                    color={"warning"}
                  >
                    <WarningIcon fontSize={"small"} />
                    &nbsp;Yes
                  </Button>
                </div>

                <div className={"delete-confirm-modal-button"}>
                  <Button
                    variant="text"
                    onClick={() => {
                      setdeleteConfirmationModalOpen(false);
                    }}
                    size={"small"}
                  >
                    No
                  </Button>
                </div>
              </footer>
            </Box>
          </Modal>

          <ul id="list">
            {noteList.map((obj, index) => (
              <ListItem
                note={obj.text}
                key={index}
                id={obj.id}
                noteList={noteList}
                setNoteList={setNoteList}
                userName={obj.user}
              />
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="centerDiv login">
            <div className="logged-out-card">
              <Typography variant="h4" display="block" marginBottom={"18px"}>
                <div>{notLoggedInContentToDisplay}</div>
                <Button variant="outlined" href="/login">
                  login
                </Button>
              </Typography>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Notes; //export Bhaskar component
