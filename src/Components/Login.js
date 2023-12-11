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
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import Alert from '@mui/material/Alert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotesIcon from '@mui/icons-material/Notes';




const STATUS = {
  EXIST: 1,
  DOESNT_EXIST: 0,
  CREATED: 2,
};

const login = (userName, password, setLoggedIn, setLoggedInUser, setShowError, setPassword, setUserName) => {
  fetch("http://localhost:8080/login", {
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
      if (convertedResponse.status === STATUS.EXIST) {
        setLoggedIn(true);
        setLoggedInUser(userName);
        localStorage.setItem("username", userName);
        console.log("logged in");
      } else if (convertedResponse.status === STATUS.DOESNT_EXIST) {
        console.log("doesnt exist");
        setShowError(true);
      }
    }).finally(() => {
      setPassword("");
      setUserName("");
    });
};

const Login = ({ setLoggedIn, setLoggedInUser }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const [showError, setShowError] = useState(false);
  return (
    // <div>
    //   <input
    //     type={"text"}
    //     value={userName}
    //     onChange={(event) => setUserName(event.target.value)}
    //   />
    //   <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    //   <br />
    //   <input
    //     type={"password"}
    //     value={password}
    //     onChange={(event) => setPassword(event.target.value)}
    //   />
    //   <br />
    // <button
    //   onClick={() => {
    //     login(userName, password, setLoggedIn, setLoggedInUser);
    //   }}
    // >
    //     login
    //   </button>
    //   <br />
    //   <a href="signup">Dont have an account? register for free</a>
    // </div>

    <div className="centerDiv login">
      <div className="title">
        NOTED&nbsp;<NotesIcon color={"action"} fontSize="large"/>
      </div>
      <div className="card">
        <AccountCircleIcon color={"action"} fontSize="large"/>
        <Typography variant="h4" display="block" marginBottom={"18px"}>
          Login
        </Typography>

        
        {showError && <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <Alert onClose={() => setShowError(false)} severity="error">Login failed</Alert>
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
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
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
              variant="contained"
              onClick={() => {
                login(userName, password, setLoggedIn, setLoggedInUser, setShowError, setPassword, setUserName);
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
                Login
              </Typography>
            </Button>
          </Stack>
        </FormControl>
        <Stack direction="row" spacing={1}>
          Dont have an account?&nbsp;<Link href="signup">Create account</Link>
        </Stack>
      </div>
      
    </div>
  );
};

export default Login;
