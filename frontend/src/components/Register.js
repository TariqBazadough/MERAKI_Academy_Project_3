import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, Route } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = (e) => {
    const user = { firstName, lastName, age, country, email, password };

    axios
      .post(`http://localhost:5000/users`, user)
      .then((res) => {
        console.log(user);
        console.log(res.data);

        if (res.data.name) {
          // "Error happened while register, please try again"
          setMessage("Error happened while register, please try again");
        } else {
          // "The user has been created successfully"
          setMessage("The user has been created successfully");
        }
      })
      .catch((err) => {});
  };
  return (
    <div className="register">
      <div>
        <p>Register:</p>
      </div>

      <div>
        <input
          className="input"
          type="text"
          placeholder="first name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <input
          className="input"
          type="text"
          placeholder="last name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <input
          className="input"
          type="nubmer"
          placeholder="age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <input
          className="input"
          type="text"
          placeholder="country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <input
          className="input"
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <input
          className="input"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <button className="registerButton" onClick={createUser}>
          Register
        </button>
      </div>
      <div className="message">{message}</div>
    </div>
  );
};

export default Register;
