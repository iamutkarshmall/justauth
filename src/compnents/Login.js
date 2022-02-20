import { React, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Usercontext from "./Usercontext";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [navigate, setNavigate] = useState(false);
  // const isMounted = useRef(true);
  const user = useContext(Usercontext);

  // useEffect(() => {
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await axios.post(
        "https://basic-mern-authentication.herokuapp.com/login",
        data,
        {
          withCredentials: true,
        }
      );
      if (response && response.data) {
        // if (isMounted.current) {
        user.setEmail(response.data.email);
        setEmail("");
        setPassword("");
        setLoginError(false);
        setNavigate(true);
        // }
      }
    } catch (error) {
      console.log(error);
      setLoginError(true);
    }
  };

  if (navigate) {
    return <Navigate to="/" />;
  }

  return (
    <div className="App">
      <h2>Login</h2>
      <form action="" onSubmit={(e) => loginUser(e)}>
        {loginError && <div>LOGIN ERROR! WRONG EMAIL OR PASSWORD!</div>}
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
        <br />
        <button>Login</button>
        <p>Not a member?</p>
        <Link to="/signup">Signup</Link>
      </form>
    </div>
  );
};

export default Login;
