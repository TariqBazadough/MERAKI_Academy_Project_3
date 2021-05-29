import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, Redirect, Route, useHistory } from "react-router-dom";
import axios from "axios";

// import Dashboard from "./components/Dashboard";

const Login = ({ setToken }) => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const checkUser = async (e) => {
    const user = { email, password };
    await axios
      .post(`http://localhost:5000/login`, user)
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          // if there is a token login is success and i will redirected to dashboard (Redirect)
          history.push("./dashboard");
          setToken(res.data.token);
        }
      })
      .catch((err) => {
        setMessage(err.response.data);
      });
  };
  return (
    <div className="login">
      <div className="login-content">
        <p>Login</p>
        <input
          className="input"
          type="text"
          placeholder="email here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          className="input"
          type="password"
          placeholder="password here"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="done-button" onClick={checkUser}>
          Login
        </button>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
