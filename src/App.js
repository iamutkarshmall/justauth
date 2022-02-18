import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./compnents/Home";
import Signup from "./compnents/Signup";
import Login from "./compnents/Login";
import Usercontext from "./compnents/Usercontext";
import axios from "axios";

const App = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("https://basic-mern-authentication.herokuapp.com/user", {
        withCredentials: true,
      })
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
      });
  }, [username, email]);

  console.log("username ", username);

  const logout = () => {
    axios
      .post(
        "https://basic-mern-authentication.herokuapp.com/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        setEmail("");
        setUsername("");
      });
  };

  return (
    <div className="App">
      <Usercontext.Provider value={{ email, username, setEmail, setUsername }}>
        <Router>
          <div>
            {!!email && (
              <div>
                Logged in as Name: {username} and Email: {email}
                &nbsp;&nbsp;
                <button onClick={() => logout()}>Logout</button>
              </div>
            )}
          </div>
          <br />
          {!!email && (
            <nav>
              <Link to="/">Home</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/signup">Signup</Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/login">Login</Link>
            </nav>
          )}
          <br />
          <br />
          <Routes>
            <Route
              path="/"
              element={
                !!email ? (
                  <Home />
                ) : (
                  <div>
                    <h2>Login to see the content</h2>
                    <br />
                    <div>
                      <Link to="/signup">Signup</Link>
                      &nbsp;&nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/login">Login</Link>
                    </div>
                  </div>
                )
              }
            />
            <Route
              exact
              path="/signup"
              element={!!email ? <h2>Already logged in </h2> : <Signup />}
            />
            <Route
              exact
              path="/login"
              element={!!email ? <h2>Already logged in </h2> : <Login />}
            />
          </Routes>
        </Router>
      </Usercontext.Provider>
    </div>
  );
};

export default App;
