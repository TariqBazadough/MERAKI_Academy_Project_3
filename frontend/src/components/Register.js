import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, Route } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = (e) => {
    const user = { firstName, lastName, age, country, email, password };

    axios
      .post(`http://localhost:5000/users`, user)
      .then((res) => {
        if (res.data.name) {
          setMessage("Error happened while register, please try again");
        } else {
          setMessage("The user has been created successfully");
        }
      })
      .catch((err) => {});
  };
  return (
    <div className="register">
      <div className="register-content">
        <p>Register:</p>

        <input
          className="input"
          type="text"
          placeholder="first name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        ></input>

        <input
          className="input"
          type="text"
          placeholder="last name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        ></input>

        <input
          className="input"
          type="nubmer"
          placeholder="age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        ></input>
        <input
          className="input"
          type="text"
          placeholder="country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        ></input>

        <input
          className="input"
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <input
          className="input"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>

        <button className="done-button" onClick={createUser}>
          Register
        </button>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default Register;
