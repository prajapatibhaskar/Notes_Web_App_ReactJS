import React, { useState } from "react";
import { ReactDOM } from "react";

import Box from "@mui/material/Box";
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
import Alert from '@mui/material/Alert';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import NotesIcon from '@mui/icons-material/Notes';

const STATUS = {
  EXIST: 1,
  DOESNT_EXIST: 0,
  CREATED: 2,
};

const signup = (userName, password, setLoggedIn, setLoggedInUser, setShowExistValidation) => {
  fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: userName,
      username: userName,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((convertedResponse) => {
      if (convertedResponse.status === STATUS.CREATED) {
        console.log("created");
        setLoggedInUser(convertedResponse.user);
        setLoggedIn(true);
        localStorage.setItem("username", convertedResponse.user);
      } else if (convertedResponse.status === STATUS.EXIST) {
        console.log("exist");
        setShowExistValidation(true);
      }
    });
};

const Signup = ({ setLoggedIn, setLoggedInUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showExistValidation, setShowExistValidation] = useState(false);
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (

    <div className="centerDiv login">
      <div className="title">
        NOTED&nbsp;<NotesIcon color={"action"} fontSize="large"/>
      </div>
      <div className="card">
      <PersonAddAltIcon color={"action"} fontSize="large"/>
      <Typography variant="h4" display="block" marginBottom={"18px"}>
        Sign up
      </Typography>
      {showExistValidation && <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <Alert onClose={() => setShowExistValidation(false)} severity="error">User exist&nbsp;
        <Link href="login">Login?</Link>
        </Alert>
        </FormControl>}
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }}>
        <Stack direction="column" spacing={4}>
          <Button
            variant="text"
            onClick={() => {
              setShowExistValidation(false);
              signup(userName, password, setLoggedIn, setLoggedInUser, setShowExistValidation);
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
              Create account
            </Typography>
          </Button>
        </Stack>
      </FormControl>
      <Stack direction="row" spacing={1}>
        Already have an account?&nbsp;<Link href="login">Login</Link>
      </Stack>
      </div>
    </div>
  );
};

export default Signup;
