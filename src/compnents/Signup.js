import { React, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  const signupUser = (e) => {
    e.preventDefault();
    try {
      if (confirmpassword === password) {
        const data = { username, email, password };
        axios
          .post(
            "https://basic-mern-authentication.herokuapp.com/signup",
            data,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmpassword("");
            console.log("signup success");
            setNavigate(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <h2>Signup</h2>
      <form action="" onSubmit={(e) => signupUser(e)}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <br />
        <br />
        <button>Signup</button>
        <p>Already Signed up?</p>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default Signup;
