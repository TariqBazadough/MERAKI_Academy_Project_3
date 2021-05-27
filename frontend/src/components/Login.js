import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, Route } from "react-router-dom";
import axios from "axios";

const Login = () => {
  return (
    <div className="login">
      <div className="login-content">
        <p>Login</p>
        <input className="input" type="text" placeholder="email here"></input>
        <input
          className="input"
          type="password"
          placeholder="password here"
        ></input>
        <button className="done-button">Login</button>
      </div>
    </div>
  );
};

export default Login;
