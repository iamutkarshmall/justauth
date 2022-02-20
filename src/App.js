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
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://basic-mern-authentication.herokuapp.com/user",
          {
            withCredentials: true,
          }
        );
        if (response && response.data) {
          setUsername(response.data.username);
          setEmail(response.data.email);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchUser();
  }, []);

  console.log("username ", username);

  const logout = async () => {
    try {
      const response = await axios.post(
        "https://basic-mern-authentication.herokuapp.com/logout",
        {},
        { withCredentials: true }
      );
      if (response) {
        setEmail("");
        setUsername("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Usercontext.Provider value={{ email, setEmail }}>
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
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Usercontext.Provider>
    </div>
  );
};

export default App;
