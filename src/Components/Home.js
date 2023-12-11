import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Notes from "./Notes";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(undefined);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to={"/user"} />
            ) : (
              <Login
                setLoggedIn={setLoggedIn}
                setLoggedInUser={setLoggedInUser}
              />
            )
          }
        />
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to={"/user"} />
            ) : (
              <Login
                setLoggedIn={setLoggedIn}
                setLoggedInUser={setLoggedInUser}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to={"/user"} />
            ):(
            <Signup
              setLoggedIn={setLoggedIn}
              setLoggedInUser={setLoggedInUser}
            />
            )
          }
        />
        <Route
          path="/user"
          element={
            <Notes
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              setLoggedIn={setLoggedIn}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
